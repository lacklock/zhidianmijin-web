import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type TargetAndTransition,
  type Transition,
} from 'motion/react'
import { cn } from 'cn'
import './rotating-text.css'

type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number

type SplitWord = {
  characters: string[]
  needsSpace: boolean
}

export type RotatingTextHandle = {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

export type RotatingTextProps = {
  texts: string[]
  currentIndex?: number
  rotationInterval?: number
  initial?: TargetAndTransition
  animate?: TargetAndTransition
  exit?: TargetAndTransition
  animatePresenceMode?: 'sync' | 'wait' | 'popLayout'
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: StaggerFrom
  transition?: Transition
  loop?: boolean
  auto?: boolean
  splitBy?: 'characters' | 'words' | 'lines' | (string & {})
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
} & Omit<
  HTMLMotionProps<'span'>,
  'animate' | 'children' | 'exit' | 'initial' | 'transition'
>

function splitIntoCharacters(text: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (segment) => segment.segment)
  }
  return Array.from(text)
}

function splitText(text: string, splitBy: string): SplitWord[] {
  if (splitBy === 'characters') {
    const words = text.split(' ')
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }))
  }
  if (splitBy === 'words') {
    return text.split(' ').map((word, i, arr) => ({
      characters: [word],
      needsSpace: i !== arr.length - 1,
    }))
  }
  if (splitBy === 'lines') {
    return text.split('\n').map((line, i, arr) => ({
      characters: [line],
      needsSpace: i !== arr.length - 1,
    }))
  }
  return text.split(splitBy).map((part, i, arr) => ({
    characters: [part],
    needsSpace: i !== arr.length - 1,
  }))
}

export const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
  function RotatingText(
    {
      texts,
      currentIndex: currentIndexProp,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref,
  ) {
    const shouldReduceMotion = useReducedMotion()
    const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
    const lastIndex = Math.max(texts.length - 1, 0)
    const isControlled = currentIndexProp !== undefined
    const currentTextIndex = isControlled
      ? Math.max(0, Math.min(currentIndexProp, lastIndex))
      : uncontrolledIndex
    const currentText = texts[currentTextIndex] ?? ''

    const elements = useMemo(
      () => splitText(currentText, splitBy),
      [currentText, splitBy],
    )

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        if (staggerFrom === 'first') return index * staggerDuration
        if (staggerFrom === 'last') {
          return (totalChars - 1 - index) * staggerDuration
        }
        if (staggerFrom === 'center') {
          const center = Math.floor(totalChars / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === 'random') {
          const randomIndex = Math.floor(Math.random() * totalChars)
          return Math.abs(randomIndex - index) * staggerDuration
        }
        return Math.abs(staggerFrom - index) * staggerDuration
      },
      [staggerFrom, staggerDuration],
    )

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        if (!isControlled) {
          setUncontrolledIndex(newIndex)
        }
        onNext?.(newIndex)
      },
      [isControlled, onNext],
    )

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === lastIndex
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex)
      }
    }, [currentTextIndex, lastIndex, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? lastIndex
            : currentTextIndex
          : currentTextIndex - 1
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex)
      }
    }, [currentTextIndex, lastIndex, loop, handleIndexChange])

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, lastIndex))
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex)
        }
      },
      [lastIndex, currentTextIndex, handleIndexChange],
    )

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0)
      }
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset],
    )

    useEffect(() => {
      if (!auto || isControlled) return
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [auto, isControlled, next, rotationInterval])

    const totalChars = elements.reduce(
      (sum, word) => sum + word.characters.length,
      0,
    )

    const content = elements.map((wordObj, wordIndex, array) => {
      const previousCharsCount = array
        .slice(0, wordIndex)
        .reduce((sum, word) => sum + word.characters.length, 0)
      return (
        <span
          key={wordIndex}
          className={cn('text-rotate-word', splitLevelClassName)}
        >
          {wordObj.characters.map((char, charIndex) => (
            <span key={charIndex} className="text-rotate-element-clip">
              {shouldReduceMotion ? (
                <span
                  className={cn('text-rotate-element', elementLevelClassName)}
                >
                  {char}
                </span>
              ) : (
                <motion.span
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={{
                    ...transition,
                    delay: getStaggerDelay(
                      previousCharsCount + charIndex,
                      totalChars,
                    ),
                  }}
                  className={cn('text-rotate-element', elementLevelClassName)}
                >
                  {char}
                </motion.span>
              )}
            </span>
          ))}
          {wordObj.needsSpace ? (
            <span className="text-rotate-space"> </span>
          ) : null}
        </span>
      )
    })

    if (shouldReduceMotion) {
      return (
        <span className={cn('text-rotate', mainClassName)}>{currentText}</span>
      )
    }

    return (
      <motion.span
        className={cn('text-rotate', mainClassName)}
        {...rest}
        layout
        transition={transition}
      >
        <span className="text-rotate-sr-only">{currentText}</span>
        <span className="text-rotate-sizer" aria-hidden="true">
          {currentText}
        </span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.span
            key={`${currentTextIndex}:${currentText}`}
            className={cn(
              splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate-overlay',
            )}
            aria-hidden="true"
          >
            {content}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    )
  },
)
