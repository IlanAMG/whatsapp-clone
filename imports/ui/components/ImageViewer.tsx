import React from 'react'
import FontAwesome from 'react-fontawesome'

import StyledImageViewer from '../elements/StyledImageViewer';

export const ImageViewer = (props:any):JSX.Element => {
    const { imageUrl, onClose } = props 

    return (
        <StyledImageViewer>
            <div className="IV--close">
                <FontAwesome 
                    name='times'
                    className='IV--icon'
                    onClick={onClose}
                />
            </div>
            <div className="IV--imageContainer">
                <img src={imageUrl} alt='image' className='IV--image' />
            </div>
        </StyledImageViewer>
    )
}
