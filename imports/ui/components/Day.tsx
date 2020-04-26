import React from 'react'

export const Day = (props:any):JSX.Element => {
    return (
        <div className='day--container'>
            <div className="day--wrapper">
                <span className="day--span">
                    {props.date}
                </span>
            </div>
        </div>
    )
}
