import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline'
import classnames from 'classnames'
import { GAME_TITLE } from '../../constants/settings'
//import ReactToolTip from 'react-tooltip'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  handleReset: () => void
  isPracticeMode: boolean
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  handleReset,
  isPracticeMode,
}: Props) => {
  const titleClasses = classnames(
    'text-xl ml-2.5 font-bold dark:text-white',
    {
      'text-green': isPracticeMode,
    }
  )

  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <div className="right-icons">
          <InformationCircleIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <RefreshIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => handleReset()}
          />
        </div>
        <p className={titleClasses}>{GAME_TITLE}</p>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 ml-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 ml-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
