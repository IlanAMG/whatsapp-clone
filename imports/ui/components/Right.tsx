import React from 'react'

import StyledRight from '../elements/StyledRight';
import { RightImg } from './RightImg';
import MessageView from './MessageView';


export const Right = (props:any):JSX.Element => {

    const { messageVisible, selectedChat } = props

    const messageText = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau Wifi."

    return (
        <StyledRight>
            {
            messageVisible ? 
                <MessageView selectedChat={selectedChat} />
            :
            <RightImg right={true} messageText={messageText} />   
            }
        </StyledRight>
    )
}
