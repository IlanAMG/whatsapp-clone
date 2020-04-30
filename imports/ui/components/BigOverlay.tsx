import React from 'react'

import StyledBigOverlay from '../elements/StyledBigOverlay';

export const BigOverlay = (props:any):JSX.Element => {
    return (
        <StyledBigOverlay>
            {props.children}
        </StyledBigOverlay>
    )
}
