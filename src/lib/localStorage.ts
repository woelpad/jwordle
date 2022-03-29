import { DEFAULT_WORD_LENGTH } from "../constants/settings"

const hepburnSuffix = '_hb'
const wordProcessorSuffix = '_wp'

const gamePrefix = 'game'
const practicePrefix = 'practice'

const stateKey = 'State'
const statsKey = 'Stats'

const constructKey = (key: string, isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
  return (isPractice ? practicePrefix : gamePrefix) + key + 
    (isWordProcessor ? wordProcessorSuffix : hepburnSuffix) + wordLength.toString()
}

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState | null, isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
  const key = constructKey(stateKey, isPractice, isWordProcessor, wordLength)
  if (gameState) {
    localStorage.setItem(key, JSON.stringify(gameState))
  } else {
    localStorage.removeItem(key)
  }
}

export const loadGameStateFromLocalStorage = (isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
  const key = constructKey(stateKey, isPractice, isWordProcessor, wordLength)
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'
const practiceStatKey = 'practiceStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats | null, isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
  const key = constructKey(statsKey, isPractice, isWordProcessor, wordLength)
  if (gameStats) {
    localStorage.setItem(key, JSON.stringify(gameStats))
  } else {
    localStorage.removeItem(key)
  }
}

export const loadStatsFromLocalStorage = (isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
  const key = constructKey(statsKey, isPractice, isWordProcessor, wordLength)
  const stats = localStorage.getItem(key)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

const highContrastKey = 'highContrast'

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}

const wordProcessorKey = 'wordProcessor'

export const setStoredIsWordProcessorMode = (isWordProcessor: boolean) => {
  if (isWordProcessor) {
    localStorage.setItem(wordProcessorKey, '1')
  } else {
    localStorage.removeItem(wordProcessorKey)
  }
}

export const getStoredIsWordProcessorMode = () => {
  const wordProcessor = localStorage.getItem(wordProcessorKey)
  return wordProcessor === '1'
}

const wordLengthKey = 'wordLength'

export const setStoredMaxWordLength = (wordLength: number) => {
  localStorage.setItem(wordLengthKey, wordLength.toString())
}

export const getStoredMaxWordLength = () => {
  const wordLength = localStorage.getItem(wordLengthKey)
  if (wordLength === null) {
    return DEFAULT_WORD_LENGTH
  } else {
    return parseInt(wordLength)
  }
}

const practiceKey = 'practice'

export const setStoredIsPracticeMode = (isPractice: boolean) => {
  if (isPractice) {
    localStorage.setItem(practiceKey, '1')
  } else {
    localStorage.removeItem(practiceKey)
  }
}

export const getStoredIsPracticeMode = () => {
  const practice = localStorage.getItem(practiceKey)
  return practice === '1'
}