import React from 'react'

import StyledFABs from '../elements/StyledFABs';
import { FABitem } from './FABitem';

export const FABs = (props:any):JSX.Element => {
    const { fabVisible, onFABInputClick, onInputChange } = props

    return (
        <StyledFABs fabVisible={props.fabVisible} >
            <FABitem onClick={onFABInputClick} bg='violet' iconName='image'>
                <input 
                    id='fileUpload'
                    type='file'
                    accept='image/*'
                    onChange={onInputChange}
                />
            </FABitem>
            <FABitem bg='orange' iconName='camera' />
            <FABitem bg='blue' iconName='file' />
            <FABitem bg='lightblue' iconName='user' />
        </StyledFABs>
    )
}
