import React from 'react'

import StyledActuItem from '../elements/StyledActuItem';
import FontAwesome from 'react-fontawesome';

export const ActuItem = (props:any):JSX.Element => {
    const { red, iconName, content } = props
    return (
        <StyledActuItem red={red}  >
            <FontAwesome 
                name={iconName}
                className='AI--icon'
            />
            <span>{content}</span>
        </StyledActuItem>
    )
}
