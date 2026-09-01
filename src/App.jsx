import { useState } from 'react'
import Lineup from './components/Lineup'
import SCHome from './components/SCHome'
import GameStatistics from './components/GameStatistics'
import Setup from './components/Setup'

// Placeholder for tabs not yet built
function ComingSoon({ name }) {
  return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-2xl font-bold">{name}</p>
      <p className="mt-2">Coming Soon</p>
    </div>
  )
}

function License() { return <ComingSoon name="License" /> }
function SCOpponent() { return <ComingSoon name="SC Opponent" /> }
function HitZone() { return <ComingSoon name="Hit Zone" /> }
function ArchivedData() { return <ComingSoon name="Archived Data" /> }
function ArchiveSummary() { return <ComingSoon name="Archive Summary" /> }
function LicensedUsers() { return <ComingSoon name="Licensed Users" /> }

export default function App() {
  const [activeTab, setActiveTab] = useState('setup')

  const tabs = [
    { id: 'license', label: 'License', component: License },
    { id: 'lineup', label: 'Lineup', component: Lineup },
    { id: 'schome', label: 'SC Home', component: SCHome },
    { id: 'scopponent', label: 'SC Opponent', component: SCOpponent },
    { id: 'hitzone', label: 'Hit Zone', component: HitZone },
    { id: 'gamestat', label: 'Game Statistics', component: GameStatistics },
    { id: 'setup', label: 'Setup', component: Setup },
    { id: 'archived', label: 'Archived Data', component: ArchivedData },
    { id: 'archsummary', label: 'Archive Summary', component: ArchiveSummary },
    { id: 'licensed', label: 'Licensed Users', component: LicensedUsers },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">SSHS Scorecard</h1>
          <p className="text-blue-100 text-sm">v1.0.0</p>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 whitespace-nowrap font-medium rounded transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {ActiveComponent ? <ActiveComponent /> : <div>Loading...</div>}
      </main>
    </div>
  )
}