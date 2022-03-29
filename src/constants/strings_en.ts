export const ALERTS_EN = {
  wins: ['Great Job!', 'Awesome', 'Well done!'],
  losses: ['Too bad', 'Better luck next time', 'So close!'],
  gameCopied: 'Game copied to clipboard',
  notEnoughLetters: 'Not enough letters',
  wordNotFound: 'Word not found',
  newDay: 'A new day, a new challenge!',
  hardMode: 'Hard Mode can only be enabled at the start!',
  wrongSpot: (letter: string, position: number) =>
    `Must use ${letter} in position ${position}`,
  notContained: (letter: string) =>
    `Guess must contain ${letter}`
}

export const KEYS_EN = {
  enter: 'Enter',
  delete: 'Delete',
}
  
export const INFO_MODAL_EN = {
  title: 'How to play',
  playMethod: 
    'Guess the word in a limited number of tries. After each guess, the color of the tiles will ' +
    'change to show how close your guess was to the word.',
  correctSpot: (letter: string) => 
    `The letter ${letter} is in the word and in the correct spot.`,
  differentSpot: (letter: string) =>
    `The letter ${letter} is in the word but in the wrong spot.`,
  noSpot: (letter: string) =>
    `The letter ${letter} is not in the word in any spot.`,
  options:
    'Romanization style and word length can be changed in Settings ' +
    'for a total of 4 different puzzles a day.',
  credits: [
    'Based on the open source ',
    ' project. Word lists distilled from ',
    '.'
  ],
}

export const SETTINGS_MODAL_EN = {
  title: 'Settings',
  wordProcessorModeName: 'Word Processor Mode',
  wordProcessorModeDescription: 'Uses Nihon-shiki instead of Hebon-shiki',
  wordLengthName: 'Change Word Length',
  hardModeName: 'Hard Mode',
  hardModeDescription: 'Any revealed hints must be used in subsequent guesses',
  darkModeName: 'Dark Mode',
  highContrastModeName: 'High Contrast Mode',
  highContrastModeDescription: 'For improved color vision',
  englishModeName: 'Switch to English',
  englishModeDescription: '言語を英語に変更',
}

export const STATS_MODAL_EN = {
  title: 'Statistics',
  practiceTitle: 'Practice Stats',
  guessDistribution: 'Guess Distribution',
  correctWord: (solution: string) =>
    `The word was ${solution}`,
  newWord: 'New word in',
  wordOfDay: 'Word o/t day',
  share: 'Share',
  practice: 'Practice',
  totalGames: 'Total plays',
  successRate: 'Success rate',
  currentStreak: 'Current streak',
  bestStreak: 'Best streak',
}