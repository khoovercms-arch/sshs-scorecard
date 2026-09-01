import { create } from 'zustand'

const useGameStore = create((set, get) => ({
  // ─── Game metadata (matches Lineup.jsx) ───
  gameMetadata: {
    gameId: '',
    date: '',
    homeTeam: '',
    awayTeam: '',
  },

  updateGameMetadata: (metadata) => set({ gameMetadata: metadata }),

  // ─── Lineup per team (matches Lineup.jsx) ───
  lineup: {},

  updateLineup: (teamName, playerList) =>
    set(state => ({
      lineup: { ...state.lineup, [teamName]: playerList }
    })),

  // ─── Score Home entries ───
  scoreHome: [],

  updateScoreHome: (id, entry) => {
    if (id === null) {
      set(state => ({
        scoreHome: [...state.scoreHome, entry]
      }))
    } else if (entry === null) {
      set(state => ({
        scoreHome: state.scoreHome.filter(e => e.id !== id)
      }))
    } else {
      set(state => ({
        scoreHome: state.scoreHome.map(e => e.id === id ? entry : e)
      }))
    }
  },

  // ─── Score Opponent entries ───
  scoreOpponent: [],

  updateScoreOpponent: (id, entry) => {
    if (id === null) {
      set(state => ({
        scoreOpponent: [...state.scoreOpponent, entry]
      }))
    } else if (entry === null) {
      set(state => ({
        scoreOpponent: state.scoreOpponent.filter(e => e.id !== id)
      }))
    } else {
      set(state => ({
        scoreOpponent: state.scoreOpponent.map(e => e.id === id ? entry : e)
      }))
    }
  },

  // ─── Archived Data ───
  archivedGames: [],

  archiveCurrentGame: () => {
    const state = get()
    const game = {
      gameId: state.gameMetadata.gameId || Date.now().toString(),
      date: state.gameMetadata.date,
      homeTeam: state.gameMetadata.homeTeam,
      opponent: state.gameMetadata.awayTeam,
      scoreHome: [...state.scoreHome],
      scoreOpponent: [...state.scoreOpponent],
      lineup: { ...state.lineup },
    }
    set(state => ({
      archivedGames: [...state.archivedGames, game],
      scoreHome: [],
      scoreOpponent: [],
      gameMetadata: { gameId: '', date: '', homeTeam: '', awayTeam: '' },
    }))
  },

  // ─── Reset current game ───
  resetGame: () => set({
    scoreHome: [],
    scoreOpponent: [],
    gameMetadata: { gameId: '', date: '', homeTeam: '', awayTeam: '' },
    lineup: {},
  }),
}))

export default useGameStore