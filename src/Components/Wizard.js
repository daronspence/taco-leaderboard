import React from 'react'
import PropTypes from 'prop-types'
import Box from './Box'

export default function Wizard({
  wizardStep,
  setWizardStep,
  isShowingWinners,
  workers,
  setWorkers,
  getWorkerAtPosition,
  setIsShowingWinners,
  ...props
}) {
  return (
    <Box>
      <Box className="grid grid-flow-col gap-4 items-center justify-center mt-8">
        {0 === wizardStep && !isShowingWinners && (
          <button
            className="p-2 bg-red-500"
            type="button"
            onClick={() => {
              const w = [...workers]
              let toShow = getWorkerAtPosition(4, w)
              const withToShow = w.map((worker) => {
                if (worker.name === toShow.name) {
                  worker.isShowing = true
                }
                return worker
              })
              setWorkers(withToShow)
              setWizardStep(wizardStep + 1)
            }}
          >
            Show Honorable Mention
          </button>
        )}
        {1 === wizardStep && !isShowingWinners && (
          <button
            className="p-2 bg-red-500"
            type="button"
            onClick={() => {
              const w = [...workers]
              let toShow = getWorkerAtPosition(3, w)
              const withToShow = w.map((worker) => {
                if (worker.name === toShow.name) {
                  worker.isShowing = true
                }
                return worker
              })
              setWorkers(withToShow)
              setWizardStep(wizardStep + 1)
            }}
          >
            Show 3rd Place
          </button>
        )}
        {2 === wizardStep && !isShowingWinners && (
          <button
            className="p-2 bg-red-500"
            type="button"
            onClick={() => {
              const w = [...workers]
              let toShow = getWorkerAtPosition(2, w)
              const withToShow = w.map((worker) => {
                if (worker.name === toShow.name) {
                  worker.isShowing = true
                }
                return worker
              })
              setWorkers(withToShow)
              setWizardStep(wizardStep + 1)
            }}
          >
            Show 2nd Place
          </button>
        )}
        {3 === wizardStep && !isShowingWinners && (
          <button
            className="p-2 bg-red-500"
            type="button"
            onClick={() => {
              const w = [...workers]
              const show = workers.map((w) => ({
                ...w,
                isShowing: true,
              }))
              setWorkers(show)
              setWizardStep(wizardStep + 1)
              setIsShowingWinners(true)
            }}
          >
            Show 1st Place
          </button>
        )}
        {!isShowingWinners && (
          <button
            className="p-2 bg-red-500"
            type="button"
            onClick={() => {
              setIsShowingWinners(!isShowingWinners)
              const show = workers.map((w) => ({
                ...w,
                isShowing: true,
              }))
              setWorkers(show)
            }}
          >
            Show All
          </button>
        )}
      </Box>
      <Box className="flex items-center justify-center mt-8">
        {(4 === wizardStep || isShowingWinners) && (
          <div className="text-2xl">
            <span className="font-bold">
              {workers.filter((w) => w.isWinner)[0].name}
            </span>
            <span>&nbsp; is the winner!</span>
          </div>
        )}
      </Box>
    </Box>
  )
}

Wizard.propTypes = {
  wizardStep: PropTypes.number.isRequired,
  setWizardStep: PropTypes.func.isRequired,
  isShowingWinners: PropTypes.bool.isRequired,
  workers: PropTypes.array.isRequired,
  setWorkers: PropTypes.func.isRequired,
  getWorkerAtPosition: PropTypes.func.isRequired,
  setIsShowingWinners: PropTypes.func.isRequired,
}
