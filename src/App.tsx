import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  lexicon,
  selectLexicon,
} from './lib/lexicon'
import {
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
  DEFAULT_WORD_LENGTH,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  daySolution,
  findFirstUnusedReveal,
  unicodeLength,
  makePracticeWord,
  tomorrow,
  selectWordList,
  getWordLengths,
  getMaxChallenges,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  saveStatsToLocalStorage,
  setStoredIsPracticeMode,
  getStoredIsPracticeMode,
  setStoredIsWordProcessorMode,
  getStoredIsWordProcessorMode,
  setStoredMaxWordLength,
  getStoredMaxWordLength,
  setStoredIsHardMode,
  getStoredIsHardMode,
  setStoredIsDarkMode,
  getStoredIsDarkMode,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  setStoredIsEnglishMode,
  getStoredIsEnglishMode,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const prefersEnglishMode = navigator.language !== 'ja'
  const prefersWordProcessorMode = !prefersEnglishMode

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [isFirstDay, setIsFirstDay] = useState(() => {
    let lacksGameState = true
    getWordLengths().forEach(length => {
      lacksGameState = lacksGameState && !loadGameStateFromLocalStorage(false, false, length) && !loadGameStateFromLocalStorage(false, true, length)
    })
    return lacksGameState
  })
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isPracticeMode, setIsPracticeMode] = useState(
    getStoredIsPracticeMode(false)
  )
  const [isWordProcessorMode, setIsWordProcessorMode] = useState(
    getStoredIsWordProcessorMode(prefersWordProcessorMode)
  )
  const [maxWordLength, setMaxWordLength] = useState(() => {
    const wordLength = getStoredMaxWordLength(DEFAULT_WORD_LENGTH)
    selectWordList(isWordProcessorMode, wordLength)
    return wordLength
  })
  const [isHardMode, setIsHardMode] = useState(
    getStoredIsHardMode(false)
  )
  const [isDarkMode, setIsDarkMode] = useState(
    getStoredIsDarkMode(prefersDarkMode)
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode(false)
  )
  const [isEnglishMode, setIsEnglishMode] = useState(() => {
    const isInEnglish = getStoredIsEnglishMode(prefersEnglishMode)
    selectLexicon(isInEnglish)
    return isInEnglish
  })

  const [stats, setStats] = useState(
    loadStats(isPracticeMode, isWordProcessorMode, maxWordLength)
  )

  const handlePracticeMode = (isPractice: boolean) => {
    if (isGameWon) {
      setIsGameWon(false)
    }
    if (isGameLost) {
      setIsGameLost(false)
    }
    setIsPracticeMode(isPractice)
    setStoredIsPracticeMode(isPractice)
    setStats(loadStats(isPractice, isWordProcessorMode, maxWordLength))
  }
  const resetPracticeMode = (isWordProcessor: boolean, wordLength: number) => {
    getWordLengths().forEach(length => {
      saveGameStateToLocalStorage(null, true, !isWordProcessor, length)
      saveStatsToLocalStorage(null, true, !isWordProcessor, length)        
      selectWordList(!isWordProcessor, length)
      saveGameStateToLocalStorage({ guesses: [], solution }, false, !isWordProcessor, length)
      saveGameStateToLocalStorage(null, true, isWordProcessor, length)
      saveStatsToLocalStorage(null, true, isWordProcessor, length)
      selectWordList(isWordProcessor, length)
      saveGameStateToLocalStorage({ guesses: [], solution }, false, isWordProcessor, length)
    });
    selectWordList(isWordProcessor, wordLength)
  }

  const loadGuesses = (isPractice: boolean, isWordProcessor: boolean, wordLength: number) => {
    let loaded = loadGameStateFromLocalStorage(false, isWordProcessor, wordLength)
    if (loaded?.solution !== daySolution) {
      if (isPractice) {
        handlePracticeMode(false)
      }
      if (!isFirstDay) {
        showSuccessAlert(lexicon.alerts.newDay)
        resetPracticeMode(isWordProcessor, wordLength)
      }
      return []
    }
    if (isPractice) {
      loaded = loadGameStateFromLocalStorage(true, isWordProcessor, wordLength)
      makePracticeWord(loaded?.solution)
      if (!loaded) {
        return []
      }
    }
    const gameWasWon = loaded.guesses.includes(solution)
    // Check on !isGameWon and !isGameLost to prevent infinite loop
    if (gameWasWon && !isGameWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === getMaxChallenges() && !gameWasWon && !isGameLost) {
      setIsGameLost(true)
      //lexicon.alerts.correctWord(solution)
    }
    return loaded.guesses
  }

  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(
    loadGuesses(isPracticeMode, isWordProcessorMode, maxWordLength)
  )

  const handleWordProcessorMode = (isWordProcessor: boolean) => {
    setIsWordProcessorMode(isWordProcessor)
    setStoredIsWordProcessorMode(isWordProcessor)
    selectWordList(isWordProcessor, maxWordLength)
    const isPractice = loadGameStateFromLocalStorage(true, isWordProcessor, maxWordLength) != null
    handlePracticeMode(isPractice)
    setStats(loadStats(isPractice, isWordProcessor, maxWordLength))
    setGuesses(loadGuesses(isPractice, isWordProcessor, maxWordLength))
    setCurrentGuess('')
  }

  const handleMaxWordLength = (wordLength: number) => {
    setMaxWordLength(wordLength)
    setStoredMaxWordLength(wordLength)
    selectWordList(isWordProcessorMode, wordLength)
    const isPractice = loadGameStateFromLocalStorage(true, isWordProcessorMode, wordLength) != null
    handlePracticeMode(isPractice)
    setStats(loadStats(isPractice, isWordProcessorMode, wordLength))
    setGuesses(loadGuesses(isPractice, isWordProcessorMode, wordLength))
    setCurrentGuess('')
  }
  const isAlternativeWordLength = () => {
    return maxWordLength !== DEFAULT_WORD_LENGTH
  }
  const handleAlternativeWordLength = (alternative: boolean) => {
    let wordLength = DEFAULT_WORD_LENGTH
    if (alternative) {
      getWordLengths().forEach(length => {
        if (length != DEFAULT_WORD_LENGTH) {
          wordLength = length
        }
      })
    }
    handleMaxWordLength(wordLength)
  }

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (isFirstDay) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || isHardMode >= isHard) {
      setIsHardMode(isHard)
      setStoredIsHardMode(isHard)
    } else {
      showErrorAlert(lexicon.alerts.hardMode)
    }
  }

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    setStoredIsDarkMode(isDark)
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handleEnglishMode = (isInEnglish: boolean) => {
    setIsEnglishMode(isInEnglish)
    selectLexicon(isInEnglish)
    setStoredIsEnglishMode(isInEnglish)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  const handleReplay = (endPractice: boolean) => {
    let reset = tomorrow <= Date.now()
    if (reset) {
      setIsFirstDay(false)
    }
    const isPractice = !reset && !endPractice
    if (isPractice) {
      //reset = !isPracticeMode || isGameWon || isGameLost
      reset = true
    }
    handlePracticeMode(isPractice)
    if (reset) {
      if (isPractice) {
        makePracticeWord()
        saveGameStateToLocalStorage({ guesses: [], solution }, isPractice, isWordProcessorMode, maxWordLength)
      } else {
        showSuccessAlert(lexicon.alerts.newDay)
        resetPracticeMode(isWordProcessorMode, maxWordLength)
      }
      setGuesses([])
      setCurrentGuess('')
      if (isGameWon) {
        setIsGameWon(false)
      }
      if (isGameLost) {
        setIsGameLost(false)
      }
    } else {
      if (!isPractice) {
        makePracticeWord(daySolution)
      }
      setGuesses(loadGuesses(isPractice, isWordProcessorMode, maxWordLength))
      setCurrentGuess('')
    }
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution }, isPracticeMode, isWordProcessorMode, maxWordLength)
  }, [guesses])

  useEffect(() => {
    if (!isSettingsModalOpen && (isGameWon || isGameLost)) {
      const messages = isGameWon ? lexicon.alerts.wins : lexicon.alerts.losses
      const message =
        messages[Math.floor(Math.random() * messages.length)]
      const delayMs = REVEAL_TIME_MS * maxWordLength

      showSuccessAlert(message, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    //if (isGameLost) {
    //  setTimeout(() => {
    //    setIsStatsModalOpen(true)
    //  }, (getMaxWordLength() + 1) * REVEAL_TIME_MS)
    //}
  }, [isGameWon, isGameLost, isPracticeMode, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= maxWordLength &&
      guesses.length < getMaxChallenges() &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEscape = () => {
    if (currentGuess !== '') {
      setCurrentGuess('')
    } else if (isGameWon || isGameLost) {
      handleReplay(false)
    }
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === maxWordLength)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(lexicon.alerts.notEnoughLetters, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(lexicon.alerts.wordNotFound, {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * maxWordLength)

    const winningWord = isWinningWord(currentGuess)
    const maxChallenges = getMaxChallenges()

    if (
      unicodeLength(currentGuess) === maxWordLength &&
      guesses.length < maxChallenges &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, isPracticeMode, isWordProcessorMode, maxWordLength, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === maxChallenges - 1) {
        setStats(addStatsForCompletedGame(stats, isPracticeMode, isWordProcessorMode, maxWordLength, guesses.length + 1))
        setIsGameLost(true)
        //showErrorAlert(lexicon.alerts.correctWord(solution), {
        //  delayMs: REVEAL_TIME_MS * maxWordLength + 1,
        //})
      }
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        handleReset={onEscape}
        isPracticeMode={isPracticeMode}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            isHighContrast={isHighContrastMode}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          onEscape={onEscape}
          guesses={guesses}
          isRevealing={isRevealing}
          isHighContrast={isHighContrastMode}
          isWordProcessor={isWordProcessorMode}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
          isHighContrastMode={isHighContrastMode}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShare={() => showSuccessAlert(lexicon.alerts.gameCopied)}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          isPracticeMode={isPracticeMode}
          isWordProcessorMode={isWordProcessorMode}
          handleReplay={handleReplay}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isWordProcessorMode={isWordProcessorMode}
          handleWordProcessorMode={handleWordProcessorMode}
          isAlternativeWordLength={isAlternativeWordLength()}
          handleAlternativeWordLength={handleAlternativeWordLength}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
          isEnglishMode={isEnglishMode}
          handleEnglishMode={handleEnglishMode}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default App
