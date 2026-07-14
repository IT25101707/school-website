import { useEffect, useState } from 'react'
import { GraduationCap, BookOpen, Banknote, Bus, Library, TrendingUp } from 'lucide-react'
import { getAdminStats } from '../../services/api'
import PortalShell, { StatCard, Panel, OfflineNote } from './PortalShell'

const SAMPLE = {
  students: 3200, teachers: 165, feesCollectedPct: 82, busRoutes: 12, libraryBooks: 18450,
  enrolment: [2850, 2920, 2980, 3040, 3120, 3200],
  attendanceByGrade: [['Primary', 96], ['Grades 6–9', 93], ['O/L', 91], ['A/L', 89]]
}
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026]

export default function AdminPortal() {
  const [s, setS] = useState(SAMPLE)
  const [offline, setOffline] = useState(false)
  useEffect(() => { getAdminStats().then(d => setS({ ...SAMPLE, ...d })).catch(() => setOffline(true)) }, [])
  const max = Math.max(...s.enrolment)

  return (
    <PortalShell title="School command centre" subtitle="A live picture of students, staff, fees, transport and the library.">
      <OfflineNote error={offline} />
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={GraduationCap} label="Students" value={s.students.toLocaleString()} />
        <StatCard icon={BookOpen} label="Teachers" value={s.teachers} />
        <StatCard icon={Banknote} label="Facility fees collected" value={`${s.feesCollectedPct}%`} />
        <StatCard icon={Bus} label="Bus routes" value={s.busRoutes} />
        <StatCard icon={Library} label="Library books" value={s.libraryBooks.toLocaleString()} />
      </div>

      <div className="grid gap-7 lg:grid-cols-2">
        <Panel title="Enrolment growth" right={<TrendingUp size={16} className="text-gold" />}>
          <div className="flex h-52 items-end gap-3">
            {s.enrolment.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-gold opacity-0 transition group-hover:opacity-100">{v}</span>
                <div className="w-full rounded-t-xl bg-gradient-to-t from-maroon to-gold transition group-hover:from-maroon-bright"
                  style={{ height: `${(v / max) * 100}%` }} />
                <span className="muted text-xs">{YEARS[i]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Attendance by section (this month)">
          <div className="space-y-5 pt-2">
            {s.attendanceByGrade.map(([label, pct]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-gold">{pct}%</span></div>
                <div className="h-2.5 rounded-full bg-gold/10"><div className="h-2.5 rounded-full bg-gradient-to-r from-maroon-bright to-gold" style={{ width: `${pct}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Management shortcuts">
          <div className="grid gap-3 sm:grid-cols-2">
            {['Student management', 'Teacher management', 'Fee records', 'Transport & routes', 'Library catalogue', 'Reports & exports'].map(x => (
              <button key={x} className="glass card-hover !rounded-xl px-4 py-3 text-left text-sm font-semibold transition hover:!border-gold">{x} →</button>
            ))}
          </div>
          <p className="muted mt-4 text-xs">These are ready-made entry points — each maps to a table in the MySQL schema (students, teachers, fees, transport, library).</p>
        </Panel>
        <Panel title="System status">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${offline ? 'bg-maroon-bright' : 'bg-emerald-400'}`} /> API server {offline ? 'offline — start the backend' : 'connected'}</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Website: live</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Notice ticker: publishing</li>
          </ul>
        </Panel>
      </div>
    </PortalShell>
  )
}
