import React from 'react'
import FontAwesome from 'react-fontawesome';

import StyledAvatar from '../elements/StyledAvatar';
import { uploadFile } from '../../api/helpers';

export const Avatar = (props: any): JSX.Element => {

    const { leftSide } = props
    const [hover, setHover] = React.useState<boolean>(false)

    const handleOverlayClick = (): void => {
        const fileInput:HTMLElement = document.getElementById('avatarUpload')
        fileInput.click()
    }

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0]
        if (file) {
            uploadFile(file, false)
        }
        hideOverlay()
    }

    const renderOverlay = (): JSX.Element => {
        if (leftSide && hover) {
            return (
                <div
                    className='avatar--overlay'
                    onMouseLeave={hideOverlay}
                    onClick={handleOverlayClick}
                >
                    <FontAwesome
                        name='camera'
                        className='overlay--icon'
                    />
                    <span className="overlay--text">CHANGER DE</span>
                    <span className="overlay--text">PHOTO DE</span>
                    <span className="overlay--text">PROFIL</span>
                </div>
            )
        }
    }

    const showOverlay = (): void => {
        if (!hover) {
            setHover(true)
        }
    }
    const hideOverlay = (): void => {
        if (hover) {
            setHover(false)
        }
    }

    return (
        <StyledAvatar large={props.large} big={props.big}>
            <img
                src={props.avatar_url}
                alt='avatar'
                className='avatar--img'
                onClick={props.onAvatarClick}
                onMouseEnter={showOverlay}
            />
            <input
                id='avatarUpload'
                type='file'
                accept='image/*'
                onChange={onInputChange}
            />
            {renderOverlay()}
        </StyledAvatar>
    )
}
