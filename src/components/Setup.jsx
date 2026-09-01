export default function Setup() {
  const hitTypes = [
    { code: 'GO', label: 'Ground Out' },
    { code: 'FO', label: 'Fly Out' },
    { code: 'SO', label: 'Strike Out' },
    { code: 'W', label: 'Walk' },
    { code: '1B', label: 'Single' },
    { code: '2B', label: 'Double' },
    { code: '3B', label: 'Triple' },
    { code: 'HR', label: 'Home Run' },
  ]

  const outcomes = [
    { code: '1st', label: '1st Base' },
    { code: '2nd', label: '2nd Base' },
    { code: '3rd', label: '3rd Base' },
    { code: 'Scored', label: 'Scored' },
    { code: 'Out', label: 'Out' },
    { code: 'DC', label: 'Defensive Choice' },
    { code: 'Dut', label: 'Duty' },
  ]

  const zones = [
    'Pull',
    'Pull-Center',
    'Center',
    'Opposite-Center',
    'Opposite',
  ]

  const positions = [
    'Pitcher',
    'Catcher',
    '1st Base',
    '2nd Base',
    'Shortstop',
    '3rd Base',
    'Left Field',
    'Center Field',
    'Right Field',
    'Rover',
  ]

  return (
    <div className="space-y-8">
      {/* Hit Types */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Hit Types</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Label</th>
              </tr>
            </thead>
            <tbody>
              {hitTypes.map((hit, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2 font-mono font-bold">{hit.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{hit.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outcomes */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Outcomes</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Label</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((outcome, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2 font-mono font-bold">{outcome.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{outcome.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hit Zones */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Hit Zones</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {zones.map((zone, idx) => (
            <div key={idx} className="bg-blue-50 border border-blue-300 rounded px-4 py-2">
              {zone}
            </div>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Fielding Positions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {positions.map((pos, idx) => (
            <div key={idx} className="bg-green-50 border border-green-300 rounded px-4 py-2">
              {pos}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}