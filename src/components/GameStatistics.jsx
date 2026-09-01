import useGameStore from '../store/gameStore';

export default function GameStatistics() {
  const gameMetadata = useGameStore((s) => s.gameMetadata);
  const scoreHome = useGameStore((s) => s.scoreHome);
  const scoreAway = useGameStore((s) => s.scoreAway);
  const archivedGames = useGameStore((s) => s.archivedGames);

  // Combine current game + archived at-bats
  const allAtBats = [
    ...scoreHome.map((ab) => ({ ...ab, side: 'Home' })),
    ...scoreAway.map((ab) => ({ ...ab, side: 'Away' })),
    ...archivedGames.flatMap((g) =>
      g.atBats.map((ab) => ({ ...ab, side: ab.side || 'Unknown' }))
    ),
  ];

  // Group by player
  const playerMap = {};
  allAtBats.forEach((ab) => {
    const key = `${ab.team || gameMetadata.homeTeam || 'Unknown'}-${ab.player}`;
    if (!playerMap[key]) {
      playerMap[key] = {
        team: ab.team || (ab.side === 'Home' ? gameMetadata.homeTeam : gameMetadata.awayTeam) || 'Unknown',
        player: ab.player,
        AB: 0,
        Hits: 0,
        '1B': 0,
        '2B': 0,
        '3B': 0,
        HR: 0,
        RBI: 0,
        Runs: 0,
        Walks: 0,
      };
    }
    const p = playerMap[key];

    const ht = (ab.hitType || '').toUpperCase();
    const outcome = (ab.outcome || '').toLowerCase();

    if (ht === 'W' || ht === 'WALK') {
      p.Walks += 1;
    } else {
      p.AB += 1;
      if (['1B', '2B', '3B', 'HR'].includes(ht)) {
        p.Hits += 1;
        if (ht === '1B') p['1B'] += 1;
        if (ht === '2B') p['2B'] += 1;
        if (ht === '3B') p['3B'] += 1;
        if (ht === 'HR') p.HR += 1;
      }
    }

    p.RBI += ab.runsBattedIn || ab.rbi || 0;
    if (outcome === 'scored') p.Runs += 1;
  });

  const players = Object.values(playerMap);

  // Calculate averages
  const calcBA = (p) => (p.AB > 0 ? (p.Hits / p.AB).toFixed(3) : '.000');
  const calcOBP = (p) => {
    const denom = p.AB + p.Walks;
    return denom > 0 ? ((p.Hits + p.Walks) / denom).toFixed(3) : '.000';
  };
  const calcSLG = (p) => {
    const totalBases = p['1B'] + p['2B'] * 2 + p['3B'] * 3 + p.HR * 4;
    return p.AB > 0 ? (totalBases / p.AB).toFixed(3) : '.000';
  };

  // Team totals
  const teamTotals = {};
  players.forEach((p) => {
    if (!teamTotals[p.team]) {
      teamTotals[p.team] = {
        AB: 0, Hits: 0, '1B': 0, '2B': 0, '3B': 0, HR: 0,
        RBI: 0, Runs: 0, Walks: 0,
      };
    }
    const t = teamTotals[p.team];
    t.AB += p.AB;
    t.Hits += p.Hits;
    t['1B'] += p['1B'];
    t['2B'] += p['2B'];
    t['3B'] += p['3B'];
    t.HR += p.HR;
    t.RBI += p.RBI;
    t.Runs += p.Runs;
    t.Walks += p.Walks;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Game Statistics</h2>

      {gameMetadata.gameId && (
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-semibold">Game:</span> {gameMetadata.gameId} |{' '}
          <span className="font-semibold">Date:</span> {gameMetadata.date} |{' '}
          <span className="font-semibold">{gameMetadata.homeTeam}</span> vs{' '}
          <span className="font-semibold">{gameMetadata.awayTeam}</span>
        </div>
      )}

      {players.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 text-yellow-800">
          No at-bat data yet. Enter at-bats in the SC Home or SC Opponent tabs.
        </div>
      ) : (
        <>
          {/* Player Stats Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-2 py-1 text-left">Team</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">Player</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">AB</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Hits</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">1B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">2B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">3B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">HR</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">RBI</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Runs</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">BB</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">BA</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">OBP</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">SLG</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .sort((a, b) => a.team.localeCompare(b.team) || a.player.localeCompare(b.player))
                  .map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-2 py-1">{p.team}</td>
                      <td className="border border-gray-300 px-2 py-1 font-medium">{p.player}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.AB}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.Hits}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p['1B']}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p['2B']}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p['3B']}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.HR}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.RBI}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.Runs}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{p.Walks}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-mono">{calcBA(p)}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-mono">{calcOBP(p)}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center font-mono">{calcSLG(p)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Team Totals */}
          <h3 className="text-lg font-bold text-blue-600 mb-2">Team Totals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border border-gray-300 px-2 py-1 text-left">Team</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">AB</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Hits</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">1B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">2B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">3B</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">HR</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">RBI</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Runs</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">BB</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">BA</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">OBP</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">SLG</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(teamTotals).map(([team, t], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-2 py-1 font-bold">{team}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.AB}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.Hits}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t['1B']}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t['2B']}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t['3B']}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.HR}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.RBI}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.Runs}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{t.Walks}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center font-mono">
                      {t.AB > 0 ? (t.Hits / t.AB).toFixed(3) : '.000'}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center font-mono">
                      {t.AB + t.Walks > 0 ? ((t.Hits + t.Walks) / (t.AB + t.Walks)).toFixed(3) : '.000'}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center font-mono">
                      {t.AB > 0
                        ? ((t['1B'] + t['2B'] * 2 + t['3B'] * 3 + t.HR * 4) / t.AB).toFixed(3)
                        : '.000'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}