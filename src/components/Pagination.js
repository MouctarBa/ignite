import Link from 'next/link'

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-16 sm:mt-20">
      <span className="inline-flex items-center justify-center w-20 h-10 text-sm font-medium rounded-full shadow-sm bg-slate-50 text-slate-500/60 shadow-sky-100/50 ring-1 ring-slate-900/5">
        Prev
      </span>
      <span className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full shadow-sm bg-sky-600 text-sky-50 shadow-sky-100/50 ring-1 ring-slate-900/5">
        1
      </span>
      <Link
        href="#"
        className="items-center justify-center hidden w-10 h-10 text-sm font-medium transition duration-200 ease-in-out rounded-full shadow-sm bg-slate-50 text-slate-700 shadow-sky-100/50 ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-sky-700 sm:inline-flex"
      >
        2
      </Link>
      <Link
        href="#"
        className="items-center justify-center hidden w-10 h-10 text-sm font-medium transition duration-200 ease-in-out rounded-full shadow-sm bg-slate-50 text-slate-700 shadow-sky-100/50 ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-sky-700 sm:inline-flex"
      >
        3
      </Link>
      <span
        href="#"
        className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full shadow-sm bg-slate-50 text-slate-500/60 shadow-sky-100/50 ring-1 ring-slate-900/5"
      >
        ...
      </span>
      <Link
        href="#"
        className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium transition duration-200 ease-in-out rounded-full shadow-sm bg-slate-50 text-slate-700 shadow-sky-100/50 ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-sky-700"
      >
        5
      </Link>
      <Link
        href="#"
        className="inline-flex items-center justify-center w-20 h-10 text-sm font-medium transition duration-200 ease-in-out rounded-full shadow-sm bg-slate-50 text-slate-700 shadow-sky-100/50 ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-sky-700"
      >
        Next
      </Link>
    </div>
  )
}
