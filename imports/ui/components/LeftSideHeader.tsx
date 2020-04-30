import React from 'react'
import FontAwesome from 'react-fontawesome';

export const LeftSideHeader = (props:any):JSX.Element => {
    return (
        <div className='LS--header'>
            <div className="LS--header__line">
                <FontAwesome 
                    name='arrow-left'
                    className='LS--header__icon'
                    onClick={props.toggleLeftSide}
                />
                <span>{props.title}</span>
            </div>
        </div>
    )
}
