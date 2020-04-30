import React from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import StyledMessageView from '../elements/StyledMessageView'
import { Avatar } from './Avatar';
import { Header } from './Header'
import { Chat, Message, MessageType } from '../../api/models';
import { Footer } from './Footer';
import { MessageBox } from './MessageBox';
import { MessagesCollection } from '../../api/messages';
import { Modal } from './Modal';
import { uploadFile, findOtherId } from '../../api/helpers';

const MessageView = (props:any):JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false)
    const [fabVisible, setFabVisible] = React.useState<boolean>(false)
    const [selectedImage, setSelectedImage] = React.useState<any>('')

    const selectedChat:Chat = props.selectedChat

    const icons:any[] = [
        {name:'search', func: () => {}},
        {name:'paperclip', func: () => {handlePaperClick()}},
        {name:'ellipsis-v', func: () => {}}
    ]

    const handlePaperClick = ():void => {
        setFabVisible(!fabVisible)
    }

    
    const handleInputClick = ():void => {
        const myInput:HTMLElement = document.getElementById('fileUpload')
        myInput.click()
    }
    
    let fileInput:any = React.useRef(null)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        fileInput.current = e.target.files[0]
        if (fileInput.current) {
            setModalVisible(true)
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (e) => {
                setSelectedImage(e.target.result)
            }
            fileReader.readAsDataURL(fileInput.current)
        }
    }

    const handleClose = ():void => {
            setModalVisible(false)
            setFabVisible(false)
    }

    const handleSend = (content:string, type:MessageType):void => {
        const message:Message = {
            chatId: selectedChat._id,
            content,
            createAt: Date.now(),
            senderId: Meteor.userId(),
            type,
            read: false,
        }

        if (modalVisible) {
            handleClose();
        }

        Meteor.call('message.insert', message, (err, id) => {
            if (err) {
                console.log('err insert msg', err)
            } else {
                console.log('res', id)
                uploadFile(fileInput.current, true)
                Tracker.autorun(() => {
                    const imageUrl:string = Session.get('wwc__imageUrl')
                    if (imageUrl && message.type === 'image') {
                        Meteor.call('message.update', id, imageUrl, (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('ok :', res)
                            }
                        })
                    }
                })
            }
        })
    }

    const avatarClick = ():void => {
        const otherId:string = findOtherId(selectedChat.participants);
        props.onAvatarClick(otherId)
    }

    return (
        <StyledMessageView>
            <Header iconClass='greyIcon' icons={icons}>
                <Avatar 
                    avatar_url={selectedChat.picture} 
                    onAvatarClick={avatarClick} 
                />
                <div className="headerMsg--container">
                    <span className="headerMsg--title">{selectedChat.title}</span>
                    <span className="headerMsg--sbTitle">en ligne</span>
                </div>
            </Header>
            {
                modalVisible ?
                    <Modal 
                        onClose={handleClose}
                        selectedImage={selectedImage}
                        onUpload={handleSend}
                    />
                : 
                    <>
                        <MessageBox 
                            selectedChat={selectedChat} 
                            messages={props.messages} 
                            fabVisible={fabVisible}
                            onFABInputClick={handleInputClick}
                            onInputChange={handleInputChange}
                            onMsgClick={props.onMsgClick} 
                        />
                        <Footer onSend={handleSend} />
                    </>
            }
        </StyledMessageView>
    )
}

export default withTracker(({selectedChat}) => {
    return {
        messages: MessagesCollection.find({chatId: selectedChat._id}).fetch()
    }
})(MessageView)
