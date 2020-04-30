import React from 'react'

import StyledRight from '../elements/StyledRight';
import { RightImg } from './RightImg';
import MessageView from './MessageView';


export const Right = (props:any):JSX.Element => {

    const { messageVisible, selectedChat, onAvatarClick, otherProfileVisible, onMsgClick } = props

    const messageText = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau Wifi."

    return (
        <StyledRight otherProfileVisible={otherProfileVisible}>
            {
            messageVisible ? 
                <MessageView 
                    onAvatarClick={onAvatarClick} 
                    selectedChat={selectedChat} 
                    onMsgClick={onMsgClick}
                />
            :
            <RightImg right={true} messageText={messageText} />   
            }
        </StyledRight>
    )
}
