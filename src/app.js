import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { shuffle } from 'lodash-es'

import Box from './Components/Box'
import Wizard from './Components/Wizard'
import Leaderboard from './Components/Leaderboard'
import RainingTacos from './Components/RainingTacos'

let workerData = [
  'Daron',
  'Joe',
  'Patrick',
  'Zach',
  'Mark',
  'Marc',
  'Kiefer',
  'Rian',
  'Ben',
  'Dave',
].map((worker) => {
  return {
    name: worker,
    score: Math.floor(Math.random() * 50),
    isShowing: false,
    isWinner: false,
  }
})

/**
 * Get the person in the given position.
 * @param {int}  position What position the person is. Eg. 1st, 2nd, 3rd.
 */
function getWorkerAtPosition(position, workers) {
  const sorted = [...workers].sort((a, b) => a.score - b.score).reverse()
  return sorted[position - 1]
}

const App = () => {
  const [workers, setWorkers] = useState([])
  const [isShowingWinners, setIsShowingWinners] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  useEffect(() => {
    let data = [...workerData].sort((a, b) => a.score - b.score)
    // the last value must be the winner.
    data[data.length - 1].isWinner = true
    data = shuffle(data)
    setWorkers(data)
  }, [setWorkers])

  return (
    <Box>
      <Box className="min-h-screen bg-gray-900 text-white relative flex items-center justify-center overflow-hidden">
        <RainingTacos
          isShowingWinners={isShowingWinners}
          className="absolute inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
        />
        <Box>
          <Box className="flex items-center justify-center">
            {!isShowingWinners && (
              <>
                {isPlayingVideo ? (
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/npjF032TDDQ?autoplay=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <button
                    className="px-4 py-2 bg-rainbow text-2xl font-bold tracking-widest uppercase"
                    onClick={() => {
                      setIsPlayingVideo(true)
                    }}
                  >
                    Roll Music 🎵
                  </button>
                )}
              </>
            )}
          </Box>
          <Box className="flex items-center justify-center">
            <Leaderboard board={workers} isShowingWinners={isShowingWinners} />
          </Box>
          <Wizard
            workers={workers}
            setWorkers={setWorkers}
            wizardStep={wizardStep}
            setWizardStep={setWizardStep}
            isShowingWinners={isShowingWinners}
            setIsShowingWinners={setIsShowingWinners}
            getWorkerAtPosition={getWorkerAtPosition}
          />
        </Box>
      </Box>
    </Box>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
