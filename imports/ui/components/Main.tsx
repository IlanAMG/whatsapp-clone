import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash'

import { Left } from './Left';
import { Right } from './Right';
import StyledMain from '../elements/StyledMain';
import { findChats } from '../../api/helpers';
import { Chat } from '../../api/models';

const Main = (props:any):JSX.Element => {
    const [messageVisible, setMessageVisible] = React.useState<boolean>(false)
    const [selectedChat, setSelectedChat] = React.useState<Chat>({})

    const handleChatClick = (_id:string):void => {
        if (!messageVisible) {
            setMessageVisible(true)
        }
        const newChat:Chat = _.find(props.chats, {_id})
        setSelectedChat(newChat)
    }

    return (
        <StyledMain>
            {
                !props.loading ?
                    <>
                        <Left 
                            chats={props.chats} 
                            onChatClick={handleChatClick}
                            selectedChat={selectedChat} 
                        />
                        <Right 
                            messageVisible={messageVisible} 
                            selectedChat={selectedChat}    
                        />
                    </>
                : null
            }
        </StyledMain>
    )
}

export default withTracker(() => {
    const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
    const messagesReady:boolean = Meteor.subscribe('messages.all').ready();
    return {
        loading: chatsReady && messagesReady ? false : true,
        chats: findChats()
    }
})(Main);
