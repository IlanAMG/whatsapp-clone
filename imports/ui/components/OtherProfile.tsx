import React from 'react'

import { Avatar } from './Avatar';
import FontAwesome from 'react-fontawesome';
import { findOtherUser } from '../../api/helpers'
import { Header } from './Header';
import StyledOtherProfile from '../elements/StyledOtherProfile';
import { Actu } from './Actu';
import { ActuItem } from './ActuItem';

const icons = [
    {
        name:'',
        func: () => {}
    },
    {
        name:'',
        func: () => {}
    },
    {
        name:'',
        func: () => {}
    }
]

export const OtherProfile = (props:any):JSX.Element => {
    const { otherUserId, onClose, onShowImage } = props
    
    const otherUser = findOtherUser(otherUserId)
    const { profile: {phone, picture, actu}, username } = otherUser
    return (
        <StyledOtherProfile>
            {
                otherUser &&
                    <>
                        <Header iconClass='greyIcon' icons={icons} >
                            <div className="OPH--heading">
                                <FontAwesome 
                                    name='times'
                                    className='iconOtherProfile'
                                    onClick={onClose}
                                />
                                <span className='OPH--title'>Infos</span>
                            </div>
                        </Header>
                        <div className="__scroll">
                            <div className="OP--imageContainer">
                                <Avatar 
                                    onAvatarClick={() => onShowImage(picture)} 
                                    avatar_url={picture} 
                                    big 
                                />
                                <div className="OPIC--txtContainer">
                                    <span className="OPIC--title">{username}</span>
                                    <span className="OPIC--sbTitle">en ligne</span>
                                </div>
                            </div>
                            <Actu actu={actu} phone={phone} />
                            <ActuItem iconName='ban' red content='Bloquer' />
                            <ActuItem iconName='thumbs-down' red content='Supprimer le Contact' />
                            <ActuItem iconName='trash' red content='Supprimer la Discussion' />
                        </div>
                    </>
            }
        </StyledOtherProfile>
    )
}