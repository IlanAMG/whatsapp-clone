import React from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import FontAwesome from 'react-fontawesome';
import StyledMessageImage from '../elements/StyledMessageImage'

const MessageImage = (props: any): JSX.Element => {
    const { mine, content, onImgClick } = props
    const heure = format(
        props.createAt,
        'HH:mm',
        { locale: fr }
    )

    const renderImage = (): JSX.Element => {
        if (!mine) {
            return (
                <>
                    <img
                        className='image'
                        alt='img'
                        src={content}
                    />
                    <div className="image--overlay">
                        <div className="detailsContainer __date">
                            <div className="image--date">
                                <span>
                                    {heure}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <img
                        className='image'
                        alt='img'
                        src={content}
                        onClick={onImgClick}
                    />
                    <div className="image--overlay">
                        <div className="detailsContainer __date">
                            <div className="image--date">
                                <span>
                                    {heure}
                                </span>
                            </div>
                            <FontAwesome 
                                name='check-double'
                                style={{color: 'white'}}
                            />
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <StyledMessageImage mine={mine}>
            {renderImage()}
        </StyledMessageImage>
    )
}

export default MessageImage