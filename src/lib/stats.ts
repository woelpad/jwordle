import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'
import { getMaxChallenges } from './words'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  isPracticeMode: boolean,
  isWordProcessorMode: boolean,
  wordLength: number,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.totalGames += 1

  if (count >= getMaxChallenges()) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  saveStatsToLocalStorage(stats, isPracticeMode, isWordProcessorMode, wordLength)
  return stats
}

const getDefaultStats = () => {
  return <GameStats>({
    winDistribution: Array.from(new Array(getMaxChallenges()), () => 0),
    gamesFailed: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
    successRate: 0,
  })
}

export const loadStats = (isPracticeMode: boolean, isWordProcessorMode: boolean, wordLength: number) => {
  return loadStatsFromLocalStorage(isPracticeMode, isWordProcessorMode, wordLength) || getDefaultStats()
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
