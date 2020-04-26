import React from 'react'
import { Meteor } from 'meteor/meteor';

import StyledLeft from '../elements/StyledLeft';
import { Avatar } from './Avatar';
import { ChatList } from './ChatList';
import { Header } from './Header';
import { Status } from './Status';
import { Searchbar } from './Searchbar';


export const Left = (props:any):JSX.Element => {
    const { chats, onChatClick, selectedChat } = props
    const icons:any[] = [
        {name:'circle-notch', func: () => {}},
        {name:'comment-alt', func: () => {}},
        {name:'ellipsis-v', func: () => {}}
    ]
    return (
        <StyledLeft>
            <Header icons={icons} iconClass='greyIcon'>
                <Avatar avatar_url={Meteor.user().profile.picture} />
            </Header>
            <Status />
            <Searchbar />
            <ChatList selectedChat={selectedChat} chats={chats} onChatClick={onChatClick} />
        </StyledLeft>
    )
}
