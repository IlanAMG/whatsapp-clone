import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

import StyledChatItem from '../elements/StyledChatItem';
import { Avatar } from './Avatar';

export const ChatItem = (props:any):JSX.Element => {

    const { title, picture, lastMessage, _id, onChatClick } = props;
    const { content, createAt } = lastMessage;

    return (
        <StyledChatItem onClick={() => onChatClick(_id)} >
            <Avatar large avatar_url={picture} />
            <div className="chat--contentContainer">
                <div className="content--line1">
                    <span className="content--line1__title">
                        {title}
                    </span>
                    <div className="content--line1__date">
                        {formatDistanceToNow(createAt, {locale: fr})}
                    </div>
                </div>
                <div className="content--line1">
                    <span className="content--message">
                        {content}
                    </span>
                    <div className="chat--badge">4</div>
                </div>
            </div>
        </StyledChatItem>
    )
}
