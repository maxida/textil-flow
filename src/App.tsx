
// Lightweight local icon fallbacks (size prop in px, className for color)


import React, { useState, useMemo } from 'react'
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
  urgent?: boolean
  primaryColor?: string
  secondaryColor?: string
  pattern?: 'solid' | 'striped' | 'v-stripes'
  phase: 'INICIAL' | 'ACEPTACIÓN' | 'PLANIFICACIÓN' | 'PRODUCCIÓN' | 'ENVIADO' | 'FINALIZADO'
  active?: boolean
}

const sampleOrders: Order[] = [
  // INICIAL (3)
  { id: '1', number: '1000-1', status: 'Pendiente', model: 'Central Córdoba (Ferro)', quantity: 30, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#FFFFFF', secondaryColor: '#000000', pattern: 'striped', phase: 'INICIAL' },
  { id: '2', number: '1000-2', status: 'Pendiente', model: 'La Florida', quantity: 18, technique: 'Bordado + vinilo', sizeBreakdown: 'M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#BF0A30', secondaryColor: '#FFFFFF', pattern: 'striped', phase: 'INICIAL' },
  { id: '3', number: '1000-3', status: 'Pendiente', model: 'San Jorge', quantity: 12, technique: 'Sublimado', sizeBreakdown: 'S-M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#0F9D58', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'INICIAL' },

  // ACEPTACIÓN (2)
  { id: '4', number: '1000-4', status: 'Aceptación', model: 'Club Mitre', quantity: 25, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#FFD600', secondaryColor: '#000000', pattern: 'striped', phase: 'ACEPTACIÓN' },
  { id: '5', number: '1000-5', status: 'Aceptación', model: 'Concepción FC', quantity: 40, technique: 'Vinilo', sizeBreakdown: '8-14', description: '', urgency: 'Normal', urgent: false, primaryColor: '#1E40AF', secondaryColor: '#000000', pattern: 'solid', phase: 'ACEPTACIÓN' },

  // PLANIFICACIÓN (1)
  { id: '6', number: '1000-6', status: 'Planificación', model: 'Ñuñorco', quantity: 20, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#DC2626', secondaryColor: '#FFFFFF', pattern: 'v-stripes', phase: 'PLANIFICACIÓN' },

  // PRODUCCIÓN (4)
  { id: '7', number: '1000-7', status: 'Producción', model: 'San Lorenzo de Alem', quantity: 60, technique: 'Sublimado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Urgente', urgent: true, primaryColor: '#1E3A8A', secondaryColor: '#7C1D3A', pattern: 'striped', phase: 'PRODUCCIÓN' },
  { id: '8', number: '1000-8', status: 'Producción', model: 'Juventud Antoniana', quantity: 35, technique: 'Bordado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#FFFFFF', secondaryColor: '#8B5E3C', pattern: 'solid', phase: 'PRODUCCIÓN' },
  { id: '9', number: '1000-9', status: 'Producción', model: 'Chaco For Ever', quantity: 28, technique: 'Vinilo', sizeBreakdown: 'M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#000000', secondaryColor: '#FFFFFF', pattern: 'striped', phase: 'PRODUCCIÓN' },
  { id: '10', number: '1000-10', status: 'Producción', model: 'Gimnasia y Tiro', quantity: 45, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#7DD3FC', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'PRODUCCIÓN' },

  // ENVIADO (6) - equipos barriales variados
  { id: '11', number: '1000-11', status: 'Enviado', model: 'Los Pibes de la 14', quantity: 22, technique: 'Vinilo', sizeBreakdown: 'S-M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#6B21A8', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'ENVIADO' },
  { id: '12', number: '1000-12', status: 'Enviado', model: 'Deportivo Tafí', quantity: 16, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#84CC16', secondaryColor: '#000000', pattern: 'solid', phase: 'ENVIADO' },
  { id: '13', number: '1000-13', status: 'Enviado', model: 'Rangers de Lules', quantity: 14, technique: 'Vinilo', sizeBreakdown: 'M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#9CA3AF', secondaryColor: '#111827', pattern: 'solid', phase: 'ENVIADO' },
  { id: '14', number: '1000-14', status: 'Enviado', model: 'Atlético Barrio Sur', quantity: 18, technique: 'Bordado', sizeBreakdown: 'S-M', description: '', urgency: 'Normal', urgent: false, primaryColor: '#F472B6', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'ENVIADO' },
  { id: '15', number: '1000-15', status: 'Enviado', model: 'Unión Norte', quantity: 20, technique: 'Sublimado', sizeBreakdown: 'S-XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#06B6D4', secondaryColor: '#042A2B', pattern: 'solid', phase: 'ENVIADO' },
  { id: '16', number: '1000-16', status: 'Enviado', model: 'Cultural Granate', quantity: 12, technique: 'Vinilo', sizeBreakdown: 'M-L', description: '', urgency: 'Normal', urgent: false, primaryColor: '#7C0A02', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'ENVIADO' },

  // FINALIZADO (8) - históricos
  { id: '17', number: '1000-17', status: 'Completado', model: 'Boca Juniors', quantity: 120, technique: 'Sublimado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#0033A0', secondaryColor: '#FFCB05', pattern: 'striped', phase: 'FINALIZADO' },
  { id: '18', number: '1000-18', status: 'Completado', model: 'River Plate', quantity: 110, technique: 'Bordado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#FFFFFF', secondaryColor: '#C8102E', pattern: 'striped', phase: 'FINALIZADO' },
  { id: '19', number: '1000-19', status: 'Completado', model: 'Selección Argentina', quantity: 200, technique: 'Sublimado', sizeBreakdown: 'S-4XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#75AADB', secondaryColor: '#FFFFFF', pattern: 'v-stripes', phase: 'FINALIZADO' },
  { id: '20', number: '1000-20', status: 'Completado', model: 'Selección Brasil', quantity: 180, technique: 'Sublimado', sizeBreakdown: 'S-4XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#009C3B', secondaryColor: '#FFCC29', pattern: 'solid', phase: 'FINALIZADO' },
  { id: '21', number: '1000-21', status: 'Completado', model: 'Real Madrid', quantity: 90, technique: 'Bordado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#FFFFFF', secondaryColor: '#000000', pattern: 'striped', phase: 'FINALIZADO' },
  { id: '22', number: '1000-22', status: 'Completado', model: 'Barcelona', quantity: 95, technique: 'Sublimado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#A50044', secondaryColor: '#004D98', pattern: 'striped', phase: 'FINALIZADO' },
  { id: '23', number: '1000-23', status: 'Completado', model: 'Manchester United', quantity: 80, technique: 'Bordado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#DA291C', secondaryColor: '#FFFFFF', pattern: 'solid', phase: 'FINALIZADO' },
  { id: '24', number: '1000-24', status: 'Completado', model: 'Juventus', quantity: 70, technique: 'Sublimado', sizeBreakdown: 'S-3XL', description: '', urgency: 'Normal', urgent: false, primaryColor: '#000000', secondaryColor: '#FFFFFF', pattern: 'v-stripes', phase: 'FINALIZADO' },
]

const phases = [
  { id: 'INICIAL', label: 'INICIAL' },
  { id: 'ACEPTACIÓN', label: 'ACEPTACIÓN' },
  { id: 'PLANIFICACIÓN', label: 'PLANIFICACIÓN' },
  { id: 'PRODUCCIÓN', label: 'PRODUCCIÓN' },
  { id: 'ENVIADO', label: 'ENVIADO' },
  { id: 'FINALIZADO', label: 'FINALIZADO' },
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
  // Prefer explicit colors/patterns provided on the order object
  if (order.primaryColor) {
    return {
      primaryColor: order.primaryColor,
      secondaryColor: order.secondaryColor ?? '#FFFFFF',
      pattern: (order.pattern as any) ?? 'solid',
      className: 'h-12 w-12',
    }
  }

  // Fallback mapping for legacy order numbers
  switch (order.number) {
    case '0000-1':
      return { primaryColor: '#FFFFFF', secondaryColor: '#ef4444', pattern: 'striped' as const, className: 'h-12 w-12' }
    case '0000-2':
      // Inter Tucumán: negra con franjas azules
      return { primaryColor: '#000000', secondaryColor: '#1d4ed8', pattern: 'striped' as const, className: 'h-12 w-12' }
    case '0000-3':
      return { primaryColor: '#F97316', pattern: 'solid' as const, className: 'h-12 w-12' }
    case '0000-4':
      return { primaryColor: '#7DD3FC', secondaryColor: '#FFFFFF', pattern: 'striped' as const, className: 'h-12 w-12' }
    default:
      // Fallback: neutral jersey
      return { primaryColor: '#94A3B8', pattern: 'solid' as const, className: 'h-12 w-12' }
  }
}

const App: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Order['phase']>('INICIAL')

  const countsByPhase = useMemo(() => {
    return sampleOrders.reduce<Record<string, number>>((acc, o) => {
      acc[o.phase] = (acc[o.phase] || 0) + 1
      return acc
    }, {})
  }, [])

  const filteredOrders = useMemo(() => sampleOrders.filter(o => o.phase === activePhase), [activePhase])

  const isCompletedWhenProduction = (phaseId: string) => {
    if (activePhase !== 'PRODUCCIÓN') return false
    return ['INICIAL', 'ACEPTACIÓN', 'PLANIFICACIÓN'].includes(phaseId)
  }

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
      <main className="flex-1 ml-72 px-8 py-10 max-w-[95%]">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-800">Resumen de Pedidos</h2>
          <p className="text-sm text-slate-500 mt-1">Vista general del flujo de producción</p>
        </header>

        {/* Workflow stepper */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-6 gap-4">
            {phases.map((p) => {
              const isActive = p.id === activePhase
              const isCompleted = isCompletedWhenProduction(p.id)
              return (
                <div key={p.id} className="">
                  <button
                    onClick={() => setActivePhase(p.id as Order['phase'])}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 border ${isActive ? 'bg-emerald-500 text-white border-emerald-600' : isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-white text-slate-700 border-slate-200'}`}>
                    <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">{p.label}</span>
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">{countsByPhase[p.id] || 0}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Orders list */}
        <section key={activePhase} className="space-y-6 fade-enter">
          {filteredOrders.map((o) => (
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
