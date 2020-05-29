import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { shuffle } from 'lodash-es'

import Box from './Components/Box'
import Wizard from './Components/Wizard'
import Leaderboard from './Components/Leaderboard'
import RainingTacos from './Components/RainingTacos'

async function getWorkerData() {
  try {
    return await fetch(
      'https://cors-anywhere.herokuapp.com/https://www.heytaco.chat/api/v1.2/json/leaderboard/T1FM0A6GZ?days=7',
    )
      .then((data) => data.json())
      .then((data) => {
        let workers = [...data.leaderboard]
        workers = workers.map((worker) => {
          return {
            ...worker,
            name: worker.username,
            score: worker.sum,
            isShowing: false,
            isWinner: false,
          }
        })
        return workers
      })
  } catch (e) {
    console.log(e)
    return []
  }
}

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
    async function getData() {
      let data = await getWorkerData()
      data.sort((a, b) => a.score - b.score)
      // the last value must be the winner.
      if (data.length) {
        data[data.length - 1].isWinner = true
      }
      data = shuffle(data)
      setWorkers(data)
    }
    getData()
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
