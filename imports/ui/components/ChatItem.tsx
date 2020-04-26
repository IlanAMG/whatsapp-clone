import React from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import StyledChatItem from '../elements/StyledChatItem';
import { Avatar } from './Avatar';

export const ChatItem = (props:any):JSX.Element => {

    const { title, picture, lastMessage, _id, onChatClick, active } = props;
    const { content, createAt } = lastMessage;

    const date = () => {
        const today = format(new Date, 'dd/MM/yyyy', {locale: fr})
        const dateMsg = format(createAt, 'dd/MM/yyyy', {locale: fr})
        if (today === dateMsg) {
            return format(createAt, 'HH:mm', {locale: fr})
        } else {
            return dateMsg
        }
    }

    return (
            <StyledChatItem active={active} onClick={() => onChatClick(_id)} >
                <Avatar large avatar_url={picture} />
                <div className="chat--contentContainer">
                    <div className="content--line1">
                        <span className="content--line1__title">
                            {title}
                        </span>
                        <div className="content--line1__date">
                            {date()}
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
