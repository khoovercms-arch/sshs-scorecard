import { useState } from 'react'
import useGameStore from '../store/gameStore';
import { Trash2, Edit2, Save, X } from 'lucide-react'

export default function SCHome() {
  const { gameMetadata, homeLineup, scoreHome, updateScoreHome } = useGameStore()
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    player: '',
    inning: '',
    hitType: '',
    outcome: '',
    zone: '',
    runsScored: '',
  })

  const hitTypes = ['Ground Out', 'Fly Out', 'Strike Out', 'Walk', '1B', '2B', '3B', 'HR']
  const outcomes = ['1st', '2nd', '3rd', 'Scored', 'Out']
  const zones = ['Pull', 'Center', 'Opposite']

  const handleAddEntry = () => {
    if (!formData.player || !formData.inning || !formData.hitType || !formData.outcome || !formData.zone) {
      alert('Please fill in all required fields')
      return
    }

    const newEntry = {
      id: Date.now(),
      ...formData,
      inning: parseInt(formData.inning),
      runsScored: parseInt(formData.runsScored) || 0,
    }

    if (editingId) {
      updateScoreHome(editingId, newEntry)
      setEditingId(null)
    } else {
      updateScoreHome(null, newEntry)
    }

    setFormData({
      player: '',
      inning: '',
      hitType: '',
      outcome: '',
      zone: '',
      runsScored: '',
    })
  }

  const handleDelete = (id) => {
    updateScoreHome(id, null)
  }

  const handleEdit = (entry) => {
    setFormData(entry)
    setEditingId(entry.id)
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      player: '',
      inning: '',
      hitType: '',
      outcome: '',
      zone: '',
      runsScored: '',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Game Metadata (Read-only) */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Game Information</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Game ID</p>
            <p className="font-semibold text-gray-900">{gameMetadata.gameId}</p>
          </div>
          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-semibold text-gray-900">{gameMetadata.date}</p>
          </div>
          <div>
            <p className="text-gray-600">Home Team</p>
            <p className="font-semibold text-gray-900">{gameMetadata.homeTeam}</p>
          </div>
        </div>
      </div>

      {/* Data Entry Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">
          {editingId ? 'Edit At-Bat' : 'New At-Bat Entry'}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Player */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player *
            </label>
            <select
              value={formData.player}
              onChange={(e) => setFormData({ ...formData, player: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Player</option>
              {homeLineup.map((player, idx) => (
                <option key={idx} value={player}>
                  {player}
                </option>
              ))}
            </select>
          </div>

          {/* Inning */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inning *
            </label>
            <select
              value={formData.inning}
              onChange={(e) => setFormData({ ...formData, inning: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Inning</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(inning => (
                <option key={inning} value={inning}>
                  {inning}
                </option>
              ))}
            </select>
          </div>

          {/* Hit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hit Type *
            </label>
            <select
              value={formData.hitType}
              onChange={(e) => setFormData({ ...formData, hitType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Hit Type</option>
              {hitTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Outcome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outcome *
            </label>
            <select
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Outcome</option>
              {outcomes.map(outcome => (
                <option key={outcome} value={outcome}>
                  {outcome}
                </option>
              ))}
            </select>
          </div>

          {/* Zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zone *
            </label>
            <select
              value={formData.zone}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Zone</option>
              {zones.map(zone => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Runs Scored */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Runs Scored
            </label>
            <input
              type="number"
              min="0"
              value={formData.runsScored}
              onChange={(e) => setFormData({ ...formData, runsScored: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddEntry}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            {editingId ? 'Update' : 'Add'} At-Bat
          </button>
          {editingId && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* At-Bat List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">At-Bats Recorded</h3>
        
        {scoreHome.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No at-bats recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Player</th>
                  <th className="px-4 py-2 text-left font-semibold">Inning</th>
                  <th className="px-4 py-2 text-left font-semibold">Hit Type</th>
                  <th className="px-4 py-2 text-left font-semibold">Outcome</th>
                  <th className="px-4 py-2 text-left font-semibold">Zone</th>
                  <th className="px-4 py-2 text-left font-semibold">Runs</th>
                  <th className="px-4 py-2 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoreHome.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{entry.player}</td>
                    <td className="px-4 py-2">{entry.inning}</td>
                    <td className="px-4 py-2">{entry.hitType}</td>
                    <td className="px-4 py-2">{entry.outcome}</td>
                    <td className="px-4 py-2">{entry.zone}</td>
                    <td className="px-4 py-2">{entry.runsScored}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}