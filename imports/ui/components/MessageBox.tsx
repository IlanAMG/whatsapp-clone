import React from 'react'
import { Meteor } from 'meteor/meteor';
import _ from 'lodash'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Day } from './Day'
import FlipMove from 'react-flip-move'

import StyledMessageBox from '../elements/StyledMessageBox';
import { MessageText } from './MessageText';
import { FABs } from './FABs';
import MessageImage from './MessageImage';
import { updateBadges } from '../../api/helpers';

export const MessageBox = (props:any):JSX.Element => {
    const { messages, selectedChat, fabVisible, onFABInputClick, onInputChange } = props
    let ancre:HTMLDivElement;

    let isEven:boolean = false;

    //messages est un array
    messages.forEach(message => {
        if (!message.senderId) {
            message.ownership = !!message.ownershop === isEven ? 'mine' : 'other'
            isEven = !isEven
            return message;
        } else {
            message.ownership = message.senderId === Meteor.userId() ? 'mine' : 'other'
            return message;
        }
    })

    //groupedMessages devient un objet (dictionnaire)
    const groupedMessages:any = _.groupBy(messages, message => {
        return format(message.createAt, 'dd/MM/yyyy', {locale: fr})
    }) 

    const newMessages:any = Object.keys(groupedMessages).map(key => {
        return {
            date:key,
            groupedMessages: groupedMessages[key],
            today: format(new Date, 'dd/MM/yyyy', {locale: fr}) === key
        }
    })

    const renderMessages = (newMessage:any):JSX.Element[] => {
        return newMessage.groupedMessages.map(message => {
            if (message.type === 'image') {
                const mine:boolean = message.ownership ==='mine';
                return (
                    <MessageImage
                        key={message._id}
                        content={message.content}
                        createAt={message.createAt}
                        mine={mine}
                        onImgClick={() => props.onMsgClick(message._id, 'image')}
                    />
                )
            }
            return (
                <MessageText
                    onClick={props.onMsgClick}
                    key={message._id}
                    id={message._id}
                    createAt={message.createAt}
                    msgClass={`message message--${message.ownership}`}  
                    content={message.content}
                    ownership={message.ownership}
                />
            )
        })
    }

    const renderDays = ():JSX.Element[] => {
        return newMessages.map((newMessage, i:number) => {
            const dateText:string = newMessage.today ? "AUJOURD'HUI" : newMessage.date 
            return (
                <div key={i}>
                    <Day date={dateText} />
                    {renderMessages(newMessage)}
                </div>
            )
        })
    }
    
    const scrollToBottom = ():void => {
        ancre.scrollIntoView({behavior: 'smooth'})
    }

    React.useEffect(() => {
        updateBadges(selectedChat.participants, selectedChat._id)
        scrollToBottom()
    }, [selectedChat, messages])

    return (
        <StyledMessageBox>
            <FABs 
                fabVisible={fabVisible} 
                onInputChange={onInputChange}
                onFABInputClick={onFABInputClick}
            />
            <FlipMove>
                {renderDays()}
            </FlipMove>
                <div ref={(el:HTMLDivElement) => ancre = el} />
        </StyledMessageBox>
    )
}
