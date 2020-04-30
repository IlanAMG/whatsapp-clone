import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash'

import Left from './Left';
import { Right } from './Right';
import StyledMain from '../elements/StyledMain';
import { findChats } from '../../api/helpers';
import { Chat, MessageType } from '../../api/models';
import { OtherProfile } from './OtherProfile';
import { ChatsCollection } from '../../api/chats';
import { BigOverlay } from './BigOverlay';
import { ImageViewer } from './ImageViewer';
import Popup from './Popup';

const initial_BigOverlay:any = {
    image: {
        visible: false,
        url: ''
    },
    popup: {
        visible: false,
        title: ''
    }
}

const Main = (props:any):JSX.Element => {
    const [messageVisible, setMessageVisible] = React.useState<boolean>(false)
    const [selectedChat, setSelectedChat] = React.useState<Chat>({})
    const [otherProfile, setOtherProfile] = React.useState<any>({})
    const [bigOverlayVisible, setBigOverlayVisible] = React.useState<any>(initial_BigOverlay)

    const handleChatClick = (_id:string):void => {
        if (!messageVisible) {
            setMessageVisible(true)
        }
        const newChat:Chat = _.find(props.chats, {_id})

        if (newChat) {
            setSelectedChat(newChat)
        } else {
            const newChat:Chat = ChatsCollection.findOne(_id)
            setSelectedChat(newChat)
        }
    }

    const handleAvatarClick = (otherId:string):void => {
        const isVisible = !otherProfile.visible
        setOtherProfile({
            visible: isVisible,
            otherId
        })
    }

    const handleClose = ():void => {
        setOtherProfile({
            visible: false,
            otherId: ''
        })
    }

    const handleUserItemClick = (otherUserId:string, username:string, picture:string):void => {
        const chat:Chat = ChatsCollection.findOne({
            participants: {
                $all: [otherUserId, Meteor.userId()]
            }
        });

        if (chat) {
            handleChatClick(chat._id)
        } else {

            const chatId:string = ChatsCollection.insert({
                title: username,
                picture,
                participants: [otherUserId, Meteor.userId()],
                lastMessage: {
                    content: '',
                    createAt: Date.now(),
                    type: MessageType.TEXT
                }
            })

            handleChatClick(chatId)
        }
    }

    const showImage = (imageUrl):void => {
        setBigOverlayVisible(prevState => {
            return {
                ...prevState,
                image: {
                    visible: true,
                    url: imageUrl
                }
            }
        })
    }

    const handleMsgClick = (msgId:string, type:string):void => {
        Session.set('wwc--message__id', msgId)
        setBigOverlayVisible(prevState => {
            return {
                ...prevState,
                popup: {
                    visible: true,
                    title: type==='text' ? 'Supprimer le Message ?' : "Supprimer l'image ?"
                }
            }
        })
    }

    const handleDeleteMsg = ():void => {
        const msgId:string = Session.get('wwc--message__id');
        Meteor.call('message.delete', msgId, (err, res) => {
            if (err) {
                console.log('err :', err)
            } else {
                console.log(res)
                setBigOverlayVisible(initial_BigOverlay)
            }
        })
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
                            otherProfileVisible={otherProfile.visible}
                            onUserItemClick={handleUserItemClick}
                        />
                        <Right 
                            messageVisible={messageVisible} 
                            selectedChat={selectedChat} 
                            onAvatarClick={handleAvatarClick}
                            otherProfileVisible={otherProfile.visible}
                            onMsgClick={handleMsgClick}
                        />
                        {bigOverlayVisible.popup.visible && 
                            <BigOverlay>
                                <Popup 
                                    title={bigOverlayVisible.popup.title}
                                    onCancel={() => setBigOverlayVisible(initial_BigOverlay)}
                                    onDelete={handleDeleteMsg}
                                />
                            </BigOverlay>
                        }
                        {bigOverlayVisible.image.visible && 
                            <BigOverlay>
                                <ImageViewer 
                                    imageUrl={bigOverlayVisible.image.url}
                                    onClose={() => setBigOverlayVisible(initial_BigOverlay)}
                                />
                            </BigOverlay>
                        }
                        {
                            otherProfile.visible &&
                                <OtherProfile
                                    onClose={handleClose} 
                                    otherUserId={otherProfile.otherId} 
                                    onShowImage={showImage}
                                />
                        }
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
