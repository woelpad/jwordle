import { getMaxChallenges } from '../../lib/words'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  isHighContrast?: boolean
  currentRowClassName: string
}

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  isHighContrast,
  currentRowClassName,
}: Props) => {
  const maxChallenges = getMaxChallenges()
  const empties =
    guesses.length < maxChallenges - 1
      ? Array.from(Array(maxChallenges - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
          isHighContrast={isHighContrast}
        />
      ))}
      {guesses.length < maxChallenges && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
