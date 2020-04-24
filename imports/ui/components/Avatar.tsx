import React from 'react'

import StyledAvatar from '../elements/StyledAvatar';

export const Avatar = (props:any):JSX.Element => {

    return (
        <StyledAvatar>
            <img 
                src={props.avatar_url}
                alt='avatar' 
                className='avatar--img'
            />
        </StyledAvatar>
    )
}
