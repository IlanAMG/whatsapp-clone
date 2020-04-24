import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import _ from 'lodash'

import { Left } from './Left';
import { Right } from './Right';
import StyledMain from '../elements/StyledMain';
import { findChats } from '../../api/helpers';
import { Chat } from '../../api/models';

export const Main = (props:any):JSX.Element => {
    const [messageVisible, setMessageVisible] = React.useState<boolean>(false)
    const [selectedChat, setSelectedChat] = React.useState<Chat>({})

    Tracker.autorun(() => {
        Meteor.subscribe('chats.mine');
        console.log('chats', findChats())
    })

    const handleChatClick = (_id:string):void => {
        if (!messageVisible) {
            setMessageVisible(true)
        }
        const newChat:Chat = _.find(findChats(), {_id})
        console.log(newChat)
    }

    return (
        <StyledMain>
            <Left chats={findChats()} onChatClick={handleChatClick} />
            <Right messageVisible={messageVisible} />
        </StyledMain>
    )
}
