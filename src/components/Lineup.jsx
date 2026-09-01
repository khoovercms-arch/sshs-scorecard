import React, { useState } from 'react';
import useGameStore from '../store/gameStore';
import { TEAMS } from '../data/roster';

export default function Lineup() {
  const [selectedTeam, setSelectedTeam] = useState('Big Red');
  const { gameMetadata, updateGameMetadata, lineup, updateLineup } = useGameStore();

  const currentTeam = TEAMS.find(t => t.name === selectedTeam);
  const teamLineup = lineup[selectedTeam] || [];

  const handleGameMetadataChange = (field, value) => {
    updateGameMetadata({ ...gameMetadata, [field]: value });
  };

  const handleLineupChange = (index, field, value) => {
    const updatedLineup = [...teamLineup];
    updatedLineup[index] = { ...updatedLineup[index], [field]: value };
    updateLineup(selectedTeam, updatedLineup);
  };

  const handleAddPlayer = (player) => {
    const newLineup = [...teamLineup, { ...player, battingOrder: teamLineup.length + 1 }];
    updateLineup(selectedTeam, newLineup);
  };

  const handleRemovePlayer = (index) => {
    const updatedLineup = teamLineup.filter((_, i) => i !== index);
    updateLineup(selectedTeam, updatedLineup.map((p, i) => ({ ...p, battingOrder: i + 1 })));
  };

  const availablePlayers = currentTeam?.players.filter(
    p => !teamLineup.find(tl => tl.id === p.id)
  ) || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lineup Management</h1>

      {/* Game Metadata Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Game Metadata</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="GameID"
            value={gameMetadata.gameId || ''}
            onChange={(e) => handleGameMetadataChange('gameId', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="date"
            value={gameMetadata.date || ''}
            onChange={(e) => handleGameMetadataChange('date', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Home Team"
            value={gameMetadata.homeTeam || ''}
            onChange={(e) => handleGameMetadataChange('homeTeam', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Away Team"
            value={gameMetadata.awayTeam || ''}
            onChange={(e) => handleGameMetadataChange('awayTeam', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Team Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Select Team</h2>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-lg"
        >
          {TEAMS.map(team => (
            <option key={team.name} value={team.name}>
              {team.name} ({team.players.length} players)
            </option>
          ))}
        </select>
      </div>

      {/* Current Lineup */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{selectedTeam} - Lineup</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Order</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Player</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Position</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamLineup.map((player, index) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{player.battingOrder}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={player.position || ''}
                      onChange={(e) => handleLineupChange(index, 'position', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    >
                      <option value="">Select Position</option>
                      <option value="Pitcher">Pitcher</option>
                      <option value="Catcher">Catcher</option>
                      <option value="1st Base">1st Base</option>
                      <option value="2nd Base">2nd Base</option>
                      <option value="Shortstop">Shortstop</option>
                      <option value="3rd Base">3rd Base</option>
                      <option value="Left Field">Left Field</option>
                      <option value="Center Field">Center Field</option>
                      <option value="Right Field">Right Field</option>
                      <option value="Rover">Rover</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemovePlayer(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Players */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Players</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availablePlayers.map(player => (
            <button
              key={player.id}
              onClick={() => handleAddPlayer(player)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              + {player.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}