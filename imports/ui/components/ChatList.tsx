import React from 'react'

import StyledChatList from '../elements/StyledChatList';
import { Chat } from '../../api/models';
import { ChatItem } from './ChatItem';

export const ChatList = (props:any):JSX.Element => {
    const { chats, onChatClick } = props
    const renderChats = ():JSX.Element[] => {
        return chats.map((chat:Chat) => {
            return (
                <ChatItem
                    key={chat._id}
                    {...chat}
                    onChatClick={onChatClick}
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
