import React from 'react'
import FontAwesome from 'react-fontawesome';

import StyledHeader from '../elements/StyledHeader';

export const Header = (props:any):JSX.Element => {

    const { icons, iconClass } = props;

    const renderIcons = ():JSX.Element[] => {
        return icons.map((icon:any, i:number)  => {
            return (
                <FontAwesome 
                    key={i}
                    className={iconClass}
                    name={icon.name}
                    onClick={icon.func}
                />
            )
        })
    }

    return (
        <StyledHeader>
            {props.children}
            <div className={props.iconsWidthSmall ? 'icons--left small' : 'icons--left'} >
                {renderIcons()}
            </div>
        </StyledHeader>
    )
}
