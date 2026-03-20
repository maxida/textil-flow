import React from 'react'
import './App.css'

type Order = {
  id: string
  number: string
  status: string
  description: string
  phase: 'INICIAL' | 'ACEPTACIÓN' | 'PLANIFICACIÓN' | 'PRODUCCIÓN' | 'ENVIADO' | 'FINALIZADO'
  active?: boolean
}

const sampleOrders: Order[] = [
  { id: '1', number: '0000-1', status: 'Pendiente', description: 'Tela algodón - color azul marino', phase: 'INICIAL', active: true },
  { id: '2', number: '0000-2', status: 'En progreso', description: 'Corte y confección - chaquetas', phase: 'PRODUCCIÓN' },
  { id: '3', number: '0000-3', status: 'Pendiente', description: 'Control de calidad - remates', phase: 'INICIAL' },
  { id: '4', number: '0000-4', status: 'Completado', description: 'Envío a cliente local', phase: 'FINALIZADO' },
]

const steps = [
  'INICIAL',
  'ACEPTACIÓN',
  'PLANIFICACIÓN',
  'PRODUCCIÓN',
  'ENVIADO',
  'FINALIZADO',
]

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white px-6 py-8 fixed inset-y-0 left-0 shadow-lg flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white" style={{ color: '#ffffff' }}>Textil-Flow</h1>
        </div>
        <nav className="space-y-3 mt-8">
          <a className="block py-2 px-3 rounded hover:bg-slate-800 transition">Pedidos</a>
          <a className="block py-2 px-3 rounded hover:bg-slate-800 transition">Clientes</a>
          <a className="block py-2 px-3 rounded hover:bg-slate-800 transition">Proveedores</a>
          <a className="block py-2 px-3 rounded hover:bg-slate-800 transition">Inventario</a>
          <a className="block py-2 px-3 rounded hover:bg-slate-800 transition">Dashboard</a>
        </nav>
        <div className="mt-auto pt-6">
          <p className="text-sm text-slate-300">Deployment Ing. Quinteros v1.0</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-800">Resumen de Pedidos</h2>
          <p className="text-sm text-slate-500 mt-1">Vista general del flujo de producción</p>
        </header>

        {/* Workflow stepper */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-4 justify-between flex-wrap">
            {steps.map((step, idx) => {
              const isActive = idx <= 3 // ejemplo: hasta PRODUCCIÓN están activas
              return (
                <div key={step} className="flex items-center gap-3">
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${isActive ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}>
                    <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{step}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Orders list */}
        <section className="space-y-6">
          {sampleOrders.map((o) => (
            <article key={o.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-800">Orden Pedido {o.number}</h3>
                <div className="mt-2 text-sm text-slate-600">{o.description}</div>
                <div className="mt-3 text-sm text-slate-500">Estado: <span className="font-semibold text-slate-700">{o.status}</span></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-slate-500">FASE</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${o.phase === 'FINALIZADO' ? 'bg-slate-100 text-slate-800' : o.phase === 'PRODUCCIÓN' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}`}>{o.phase}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
