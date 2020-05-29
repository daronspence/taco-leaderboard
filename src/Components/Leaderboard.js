import React from 'react'
import PropTypes from 'prop-types'

const Leaderboard = ({ board, isShowingWinners }) => {
  if (!board.length) {
    return (<div className="mt-8">No peeps from the API :(</div>)
  }
  return (
    <div className="grid gap-4 grid-flow-col items-end h-64">
      {board.map((worker) => {
        return (
          <div key={worker.name} className="w-24 text-center">
            <div
              className="border-b border-red-500 transition flex flex-col justify-center items-center"
              style={{
                borderBottomWidth:
                  worker.isShowing || isShowingWinners
                    ? `${worker.score * 5}px`
                    : 0,
              }}
            >
              <img src={worker.avatar} className="w-16 h-16 rounded-full block" />
              {worker.isShowing && (
                <span className="ml-2 relative" style={{top: 24}}>({worker.score} tacos)</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Leaderboard.propTypes = {
  board: PropTypes.array.isRequired,
  isShowingWinners: PropTypes.bool.isRequired,
}

export default Leaderboard
