import React from 'react'

const Leaderboard = ({ board, isShowingWinners }) => {
    return (
        <div className="grid gap-4 grid-flow-col items-end h-32">
            {board.map((worker) => {
                return (
                    <div key={worker.name} className="w-24 text-center">
                        <div
                            className="border-b border-red-500 transition"
                            style={{
                                borderBottomWidth:
                                    worker.isShowing || isShowingWinners
                                        ? `${worker.score}px`
                                        : 0,
                            }}
                        >
                            {worker.name}
                            {worker.isShowing && (
                                <span className="ml-2">({worker.score})</span>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Leaderboard
