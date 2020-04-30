import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import StyledChatList from '../elements/StyledChatList';
import { Chat } from '../../api/models';
import { ChatItem } from './ChatItem';

const ChatList = (props:any):JSX.Element => {
    const { chats, onChatClick, selectedChat } = props


    const renderChats = ():JSX.Element[] => {
        if (props.newChats) {
            return props.newChats.sort((a:Chat, b:Chat) => {
                return b.lastMessage.createAt - a.lastMessage.createAt;
            })
            .map((chat:Chat) => {
                const active:boolean = selectedChat._id === chat._id
                return (
                        <ChatItem
                            key={chat._id}
                            {...chat}
                            onChatClick={onChatClick}
                            active={active}
                        />
                )
            })
        } else {
            return chats.sort((a:Chat, b:Chat) => {
                return b.lastMessage.createAt - a.lastMessage.createAt;
            })
            .map((chat:Chat) => {
                const active:boolean = selectedChat._id === chat._id
                return (
                        <ChatItem
                            key={chat._id}
                            {...chat}
                            onChatClick={onChatClick}
                            active={active}
                        />
                )
            })
        }
    }

    return (
        <StyledChatList>
                {renderChats()}
        </StyledChatList>
    )
}

export default withTracker((props:any) => {
    return {
        newChats : props.pattern === '' ? null : props.users2
    }
})(ChatList);
