import React from 'react'
import FontAwesome from 'react-fontawesome';

import StyledAvatar from '../elements/StyledAvatar';
import StyledStatus from '../elements/StyledStatus'

export const Status = (props:any):JSX.Element => {
    return (
        <StyledStatus color='blue' >
            <StyledAvatar>
                <FontAwesome
                    name='bell-slash'
                    size='2x'
                    className='icon--color'
                />
            </StyledAvatar>
            <div className='status--textContainer'>
                <div className='text--big'>
                    Être averti(e) des nouveaux messages.
                </div>
                <span className='text--small'>
                    Afficher les notifications sur le bureau >
                </span>
            </div>
        </StyledStatus>
    )
}
