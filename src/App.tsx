
// Lightweight local icon fallbacks (size prop in px, className for color)


import React from 'react'
import { JerseyIcon } from './components/JerseyIcon'
// Local lightweight icon components as fallbacks to avoid installing external deps
// (Shirt component removed — using custom JerseyIcon per order)

const Layers = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l9 6-9 6-9-6 9-6z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14l9 6 9-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Ruler = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 9v6M10 9v6M13 9v6M16 9v6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type Order = {
  id: string
  number: string
  status: string
  model: string
  quantity: number
  technique?: string
  sizeBreakdown?: string
  description?: string
  urgency?: 'Normal' | 'Urgente'
  phase: 'INICIAL' | 'ACEPTACIÓN' | 'PLANIFICACIÓN' | 'PRODUCCIÓN' | 'ENVIADO' | 'FINALIZADO'
  active?: boolean
}

const sampleOrders: Order[] = [
  {
    id: '1',
    number: '0000-1',
    status: 'Pendiente',
    model: "C.A. San Martín - Suplente",
    quantity: 22,
    technique: 'Escudo bordado HD',
    sizeBreakdown: '2 Arqueros (Gris), 20 Jugadores (Talles: 5S, 8M, 5L, 2XL)',
    description: '2 arqueros + 20 jugadores — colores y talles variados',
    urgency: 'Normal',
    phase: 'INICIAL',
    active: true,
  },
  {
    id: '2',
    number: '0000-2',
    status: 'En progreso',
    model: 'Inter Tucumán - Torneo Relámpago',
    quantity: 15,
    technique: 'Vinilo dorado para números',
    sizeBreakdown: 'Talle L (12), Talle M (3)',
    description: 'Equipamiento para torneo relámpago',
    urgency: 'Urgente',
    phase: 'PRODUCCIÓN',
  },
  {
    id: '3',
    number: '0000-3',
    status: 'Pendiente',
    model: 'Los Leoncitos - Infantil',
    quantity: 50,
    technique: 'Logo sublimado',
    sizeBreakdown: 'Talles 10, 12 y 14. Numeración 1-50',
    description: 'Línea infantil con numeración corrida',
    urgency: 'Normal',
    phase: 'ACEPTACIÓN',
  },
  {
    id: '4',
    number: '0000-4',
    status: 'Completado',
    model: 'Atlético Tucumán - Edición Especial',
    quantity: 100,
    technique: 'Parche en manga',
    sizeBreakdown: 'Curva completa (S a XL)',
    description: 'Edición especial con parche y curva completa de talles',
    urgency: 'Normal',
    phase: 'FINALIZADO',
  },
]

const steps = [
  'INICIAL',
  'ACEPTACIÓN',
  'PLANIFICACIÓN',
  'PRODUCCIÓN',
  'ENVIADO',
  'FINALIZADO',
]

const getPhaseClasses = (phase: Order['phase']) => {
  switch (phase) {
    case 'INICIAL':
      return 'bg-sky-100 text-sky-800'
    case 'PRODUCCIÓN':
      return 'bg-amber-100 text-amber-800'
    case 'FINALIZADO':
      return 'bg-emerald-100 text-emerald-800'
    case 'ACEPTACIÓN':
      return 'bg-violet-100 text-violet-800'
    case 'PLANIFICACIÓN':
      return 'bg-slate-100 text-slate-800'
    case 'ENVIADO':
      return 'bg-teal-100 text-teal-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
}

const getLayerColor = (order: Order) => {
  // Prefer explicit order number mapping for clarity and scalability
  if (order.number === '0000-1') return 'text-slate-100' // suplente blanco / muy claro
  if (order.number === '0000-2') return 'text-yellow-500' // dorado (vinilo)
  if (order.number === '0000-3') return 'text-orange-500' // naranja infantil
  if (order.number === '0000-4') return 'text-sky-400' // celeste Atlético

  // Fallbacks by model name
  if (order.model.includes('San Martín')) return 'text-slate-100'
  if (order.model.includes('Inter')) return 'text-yellow-500'
  if (order.model.includes('Leoncitos')) return 'text-orange-500'
  if (order.model.includes('Atlético')) return 'text-sky-400'

  return 'text-slate-400'
}

const getJerseyProps = (order: Order) => {
  switch (order.number) {
    case '0000-1':
      return { primaryColor: '#FFFFFF', secondaryColor: '#ef4444', pattern: 'striped' as const }
    case '0000-2':
      // Inter Tucumán: negra con franjas azules
      return { primaryColor: '#000000', secondaryColor: '#1d4ed8', pattern: 'striped' as const }
    case '0000-3':
      return { primaryColor: '#F97316', pattern: 'solid' as const }
    case '0000-4':
      return { primaryColor: '#7DD3FC', secondaryColor: '#FFFFFF', pattern: 'striped' as const }
    default:
      // Fallback: neutral jersey
      return { primaryColor: '#94A3B8', pattern: 'solid' as const }
  }
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-900 font-sans">
      
        {/* Sidebar - Senior 2026 redesign */}
        <aside className="w-72 bg-slate-950 text-white px-6 py-8 fixed inset-y-0 left-0 shadow-lg flex flex-col border-r border-slate-800 backdrop-blur-sm transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-3xl font-white tracking-tighter text-black" style={{ textShadow: '0 3px 10px rgba(255, 255, 255, 0.35)' }}>Textil-Flow</h1>
          </div>

          <nav className="mt-6 space-y-6">
            <div>
              <div className="text-xs uppercase text-slate-500 mb-2">Gestión</div>
              <div className="flex flex-col gap-2">
                <button className="relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-900">
                  {/* active indicator */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-md bg-sky-400" />
                  <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-2-2h-4l-2-2h-4L7 6H3a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Pedidos</span>
                </button>

                <button className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-900">
                  <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M6 11h12M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Inventario</span>
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-slate-500 mb-2">Admin</div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-900">
                  <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Clientes</span>
                </button>

                <button className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-900">
                  <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M5 7v14h14V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Proveedores</span>
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-slate-500 mb-2">Analytics</div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-900">
                  <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 13l3-3 4 4 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-medium">Dashboard</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6">
            <div className="bg-white/3 border border-white/5 rounded-lg p-3 flex items-center gap-3 text-sm text-slate-300 glassy">
              <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 18v-2a4 4 0 0 0-4-4H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6h18M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>
                <div className="text-[11px] text-slate-400">Developed by</div>
                <div className="text-sm font-medium">Engineer Quinteros v1.0</div>
              </div>
            </div>
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
            <article key={o.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex items-center justify-between order-card glassy">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-slate-800">Orden Pedido {o.number}</h3>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold bg-sky-50 text-sky-800">Cantidad: {o.quantity}</span>
                  <span className="text-sm text-slate-500">Estado: <span className="font-semibold text-slate-700">{o.status}</span></span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 flex items-center justify-center">
                      <JerseyIcon {...getJerseyProps(o)} className="h-12 w-12" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Modelo</div>
                      <div className="font-semibold text-slate-800">{o.model}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Layers size={18} className={`${getLayerColor(o)}`} />
                    <div>
                      <div className="text-slate-500 text-xs">Tela / Técnica</div>
                      <div className="font-semibold text-slate-800">{o.technique}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Ruler size={18} className="text-slate-400" />
                    <div>
                      <div className="text-slate-500 text-xs">Desglose Talles</div>
                      <div className="font-semibold text-slate-800">{o.sizeBreakdown}</div>
                    </div>
                  </div>
                </div>

                {o.description && <div className="mt-3 text-sm text-slate-500">{o.description}</div>}
              </div>

              <div className="flex flex-col items-end gap-3 ml-6">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-500 mr-2">Urgencia</div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${o.urgency === 'Urgente' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className={`text-sm font-semibold text-slate-700 ${o.urgency === 'Urgente' ? 'tracking-wide' : ''}`}>{o.urgency}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">FASE</div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium phase-badge ${getPhaseClasses(o.phase)}`}>{o.phase}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
