import React from 'react'

import StyledLeftSide from '../elements/StyledLeftSide';

export const LeftSide = (props:any):JSX.Element => {
    return (
        <StyledLeftSide>
            {props.children}
        </StyledLeftSide>
    )
}
