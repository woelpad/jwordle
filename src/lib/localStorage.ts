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

const practiceKey = 'practice'

export const setStoredIsPracticeMode = (isPractice: boolean) => {
  localStorage.setItem(practiceKey, isPractice ? '1' : '0')
}

export const getStoredIsPracticeMode = (defaultPractice: boolean) => {
  const practice = localStorage.getItem(practiceKey)
  return practice === null ? defaultPractice : practice !== '0'
}

const wordProcessorKey = 'wordProcessor'

export const setStoredIsWordProcessorMode = (isWordProcessor: boolean) => {
  localStorage.setItem(wordProcessorKey, isWordProcessor ? '1' : '0')
}

export const getStoredIsWordProcessorMode = (defaultWordProcessor: boolean) => {
  const wordProcessor = localStorage.getItem(wordProcessorKey)
  return wordProcessor === null ? defaultWordProcessor : wordProcessor !== '0'
}

const wordLengthKey = 'wordLength'

export const setStoredMaxWordLength = (wordLength: number) => {
  localStorage.setItem(wordLengthKey, wordLength.toString())
}

export const getStoredMaxWordLength = (defaultWordLength: number) => {
  const wordLength = localStorage.getItem(wordLengthKey)
  return wordLength === null ? defaultWordLength : parseInt(wordLength)
}

const difficultyKey = 'difficulty'

export const setStoredIsHardMode = (isHard: boolean) => {
  localStorage.setItem(difficultyKey, isHard ? 'hard' : 'normal')
}

export const getStoredIsHardMode = (defaultHard: boolean) => {
  const difficulty = localStorage.getItem(difficultyKey)
  return difficulty === null ? defaultHard : difficulty !== 'normal'
}

const themeKey = 'theme'

export const setStoredIsDarkMode = (isDark: boolean) => {
  localStorage.setItem(themeKey, isDark ? 'dark' : 'light')
}

export const getStoredIsDarkMode = (defaultDark: boolean) => {
  const theme = localStorage.getItem(themeKey)
  return theme === null ? defaultDark : theme !== 'light'
}

const highContrastKey = 'highContrast'

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  localStorage.setItem(highContrastKey, isHighContrast ? '1' : '0')
}

export const getStoredIsHighContrastMode = (defaultHighConstrast: boolean) => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === null ? defaultHighConstrast : highContrast !== '0'
}

const languageKey = 'language'

export const setStoredIsEnglishMode = (isEnglish: boolean) => {
  localStorage.setItem(languageKey, isEnglish ? 'en' : 'ja')
}

export const getStoredIsEnglishMode = (defaultEnglish: boolean) => {
  const language = localStorage.getItem(languageKey)
  return language === null ? defaultEnglish : language !== 'ja'
}
