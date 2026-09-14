import { SearchPanel } from '@/components/home/search-panel'

export default function SearchPanelDebugPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_50%_0%,#eaf4fd_0%,#f8fbfe_43%,#fff_78%)] py-10">
      <div className="page-shell flex flex-col gap-10">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold">搜索面板调试</h1>
            <p className="mt-2 text-muted-foreground">
              两个实例分别固定为默认态和展开态，方便对照调试 UI。
            </p>
          </div>
          <a href="/" className="shrink-0 text-primary hover:underline">
            返回首页
          </a>
        </header>
        <section aria-labelledby="default-panel-title">
          <h2 id="default-panel-title" className="mb-4 text-base font-medium">
            默认展示态
          </h2>
          <SearchPanel expanded={false} />
        </section>
        <section aria-labelledby="expanded-panel-title">
          <h2 id="expanded-panel-title" className="mb-4 text-base font-medium">
            展开态
          </h2>
          <SearchPanel expanded />
        </section>
      </div>
    </main>
  )
}
