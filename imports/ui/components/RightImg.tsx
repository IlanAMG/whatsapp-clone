import React from 'react'

import StyledRightImg from '../elements/StyledRightImg';

export const RightImg = (props:any):JSX.Element => {
    return (
        <StyledRightImg right={props.right}>
            <img
                alt='bg'
                className='rightImg--image'
                src='./images/whatsapp-bg-1.jpg'
            />
            <h3 className='rightImg--title'>
                Gardez votre téléphone connecté
            </h3>
            <div className="rightImg--div">
                <p className="rightImg--p">
                    {props.messageText}
                </p>
                <div className="rightImg--divider"></div>
            </div>
            {props.children}
        </StyledRightImg>
    )
}
