export const revalidate = 0

async function getStatus() {
  try {
    const res = await fetch('/api/status', { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (e) {
    return { error: String(e?.message || e) }
  }
}

export default async function StatusPage() {
  const data = await getStatus()
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Runtime Status</h1>
      <p className="mt-2 text-slate-600">Strapi connectivity and env snapshot.</p>
      <pre className="mt-6 overflow-auto rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
