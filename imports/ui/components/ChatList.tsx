import React from 'react'

import StyledChatList from '../elements/StyledChatList';
import { Chat } from '../../api/models';
import { ChatItem } from './ChatItem';

export const ChatList = (props:any):JSX.Element => {
    const { chats, onChatClick, selectedChat } = props
    const renderChats = ():JSX.Element[] => {
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

    return (
        <StyledChatList>
                {renderChats()}
        </StyledChatList>
    )
}
