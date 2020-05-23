import React from 'react'
import { Snowfall, Snowflake } from 'react-snowflakes'
import Taco from './Taco'

export default function RainingTacos({ isShowingWinners, ...props }) {
    if (!isShowingWinners) return null
    return (
        <div {...props}>
            <Snowfall
                className="h-screen"
                count={20}
                snowflakeFactory={(idx) => {
                    return (
                        <Snowflake className="w-12 h-12 flex items-stretch">
                            <Taco
                                className="w-12 h-12 block wobble"
                                style={{
                                    animationDelay:
                                        Math.floor(Math.random() * 50) + 'ms',
                                    animationDuration:
                                        Math.floor(Math.random() * 1000 + 500) +
                                        'ms',
                                }}
                            />
                        </Snowflake>
                    )
                }}
            />
        </div>
    )
}
