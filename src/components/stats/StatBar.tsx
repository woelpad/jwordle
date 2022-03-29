import { GameStats } from '../../lib/localStorage'
import { lexicon } from '../../lib/lexicon'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  const modal = lexicon.statsModal
  return (
    <div className="flex justify-center my-2">
      <StatItem label={modal.totalGames} value={gameStats.totalGames} />
      <StatItem label={modal.successRate} value={`${gameStats.successRate}%`} />
      <StatItem label={modal.currentStreak} value={gameStats.currentStreak} />
      <StatItem label={modal.bestStreak} value={gameStats.bestStreak} />
    </div>
  )
}
