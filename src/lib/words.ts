import { DEFAULT_WORD_LENGTH, GAME_EPOCH, TARGET_PROTECT_RATIO } from '../constants/settings'
import { hepburnCollection, wordProcessorCollection } from './corpus'
import { lexicon } from './lexicon'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

let corpus = hepburnCollection[DEFAULT_WORD_LENGTH]

export const isWordInWordList = (word: string) => {
  return (
    corpus.targetWords.includes(localeAwareLowerCase(word)) ||
    corpus.validGuesses.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i])
    }
    if (statuses[i] === 'correct' && word[i] !== guess[i]) {
      return lexicon.alerts.wrongSpot(guess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return lexicon.alerts.notContained(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return (process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()).replaceAll('－', '-')
}

export const localeAwareUpperCase = (text: string) => {
  return (process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()).replaceAll('-', '－')
}

export const getWordOfDay = () => {
  const epochMs = new Date(GAME_EPOCH).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const offset = Math.floor((now - epochMs) / msInDay)
  const nextday = (offset + 1) * msInDay + epochMs
  const length = corpus.targetWords.length
  const index = ((offset % length) + length) % length

  return {
    daySolution: localeAwareUpperCase(corpus.targetWords[index]),
    daySolutionIndex: index,
    dayOffset: offset,
    tomorrow: nextday,
  }
}

export let { daySolution, daySolutionIndex, dayOffset, tomorrow } = getWordOfDay()

export let solution = daySolution
let solutionIndex = daySolutionIndex

export const updateWordOfDay = () => {
  let toSolve = getWordOfDay()
  solution = daySolution = toSolve.daySolution
  solutionIndex = daySolutionIndex = toSolve.daySolutionIndex
  dayOffset = toSolve.dayOffset
  tomorrow = toSolve.tomorrow
}

export const makePracticeWord = (word = '') => {
  if (word) {
    solutionIndex = corpus.targetWords.indexOf(localeAwareLowerCase(word))
  } else {
    // Pick a word outside a protected area centered on the current daySolutionIndex
    solutionIndex = daySolutionIndex + Math.floor(((1 - TARGET_PROTECT_RATIO) * Math.random() + TARGET_PROTECT_RATIO / 2.) * corpus.targetWords.length)
    word = corpus.targetWords[solutionIndex % corpus.targetWords.length]
  }
  solution = localeAwareUpperCase(word)
}

export const selectWordList = (isWordProcessorMode: boolean, wordLength: number) => {
  corpus = isWordProcessorMode ? wordProcessorCollection[wordLength] : hepburnCollection[wordLength]
  updateWordOfDay()
}

export const getWordLengths = () => {
  return Object.keys(hepburnCollection).map(x => parseInt(x))
}

export const getMaxWordLength = () => {
  return corpus.wordLength
}

export const getMaxChallenges = () => {
  return corpus.maxChallenges
}

export const isWordProcessorMode = () => {
  return corpus.style === 'WP'
}

export const getIdentification = () => {
  return corpus.style + corpus.wordLength.toString()
}

export const getReadings = () => {
  return <Array<Array<Array<string>>>>(corpus.thesaurus[solutionIndex].slice(1))
}