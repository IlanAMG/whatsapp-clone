import React from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import FontAwesome from 'react-fontawesome';

import StyledChatItem from '../elements/StyledChatItem';
import { Avatar } from './Avatar';
import { getBadges, updateBadges } from '../../api/helpers';

export const ChatItem = (props: any): JSX.Element => {

    const { title, picture, lastMessage, _id, onChatClick, active, participants } = props;
    const { content, createAt, type } = lastMessage;

    let badges:number = getBadges(_id);

    const date = () => {
        const today = format(new Date, 'dd/MM/yyyy', { locale: fr })
        const dateMsg = format(createAt, 'dd/MM/yyyy', { locale: fr })
        if (today === dateMsg) {
            return format(createAt, 'HH:mm', { locale: fr })
        } else {
            return dateMsg
        }
    }

    React.useEffect(() => {
        if (active) {
            updateBadges(participants, _id)
            badges = getBadges(_id)
        }
    }, [lastMessage])

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
                    {
                        type === 'text' ?
                            <span className="content--message">
                                {content}
                            </span>
                        :
                            <span className="content--message">
                                <FontAwesome 
                                    name='camera'
                                    style={{'marginRight': '0.4rem'}}
                                />
                                Pièce jointe
                            </span>
                    }
                    {
                        badges > 0 &&
                            <div className="chat--badge">{badges}</div>                            
                    }
                </div>
            </div>
        </StyledChatItem>
    )
}
