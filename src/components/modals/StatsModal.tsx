import {
  ChartBarIcon,
  RefreshIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { Lookup } from '../stats/Lookup'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow, solution, getIdentification, getReadings } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { lexicon } from '../../lib/lexicon'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  isPracticeMode: boolean
  isWordProcessorMode: boolean
  handleReplay: (endPractice: boolean) => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  isPracticeMode,
  isWordProcessorMode,
  handleReplay,
}: Props) => {
  const modal = lexicon.statsModal
  const title = getIdentification() + ' ' + (isPracticeMode ? modal.practiceTitle : modal.title)

  const reshare = () => {
    shareStatus(
      guesses,
      isGameLost,
      isHardMode,
      isDarkMode,
      isHighContrastMode
    )
    handleShare()
  }
  const replay = () => {
    handleClose()
    handleReplay(false)
  }
  const reshow = () => {
    handleClose()
    handleReplay(true)
  }

  return (
    <BaseModal
      title={title}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      {(gameStats.totalGames > 0) && (
        <div>
          <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            {modal.guessDistribution}
          </h4>
          <Histogram gameStats={gameStats} />
        </div>
      )}
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 rows-2 dark:text-white">
          <div>
            <h5>{modal.correctWord(solution)}</h5>
          </div>
          <div>
            {
              getReadings().map(readings => (
                <Lookup
                  key={readings.slice(-1)[0].join(' ')}
                  readings={readings}
                />
              ))
            }
          </div>
        </div>
      )}
      {(isGameLost || isGameWon || isPracticeMode) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{modal.newWord}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div className="mt-5 sm:mt-6 rows-2 dark:text-white">
          {(isPracticeMode) && (
            <div className="right-icons">
              <ChartBarIcon
              className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
              onClick={reshow}
              /><span onClick={reshow}>{modal.wordOfDay}</span>
            </div>
          ) || (
            <div className="right-icons">
              <ShareIcon
                className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                onClick={reshare}
              /><span onClick={reshare}>{modal.share}</span>
            </div>
          )}
            <div className="right-icons">
              <RefreshIcon
                className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                onClick={replay}
              /><span onClick={replay}>{modal.practice}</span>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  )
}
