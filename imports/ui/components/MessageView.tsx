import React from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'

import StyledMessageView from '../elements/StyledMessageView'
import { Avatar } from './Avatar';
import { Header } from './Header'
import { Chat, Message, MessageType } from '../../api/models';
import { Footer } from './Footer';
import { MessageBox } from './MessageBox';
import { MessagesCollection } from '../../api/messages';
import { Modal } from './Modal';
import { uploadFile } from '../../api/helpers';

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

    let fileInput:any;

    const handleInputClick = ():void => {
        const myInput:HTMLElement = document.getElementById('fileUpload')
        myInput.click()
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        fileInput = e.target.files[0]
        if (fileInput) {
            setModalVisible(true)
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (e) => {
                setSelectedImage(e.target.result)
            }
            fileReader.readAsDataURL(fileInput)
        }
    }
    const handleClose = ():void => {
            setModalVisible(false)
            setFabVisible(false)
    }

    const handleSend = (content:string):void => {
        const message:Message = {
            chatId: selectedChat._id,
            content,
            createAt: Date.now(),
            senderId: Meteor.userId(),
            type: MessageType.TEXT,
            read: false,
        }
        Meteor.call('message.insert', message, (err, res) => {
            if (err) {
                console.log('err insert msg', err)
            } else {
                console.log('res', res)
            }
        })
    }

    return (
        <StyledMessageView>
            <Header iconClass='greyIcon' icons={icons}>
                <Avatar avatar_url={selectedChat.picture} />
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
                        onUpload={() => uploadFile(fileInput)}
                    />
                : 
                    <>
                        <MessageBox 
                            selectedChat={selectedChat} 
                            messages={props.messages} 
                            fabVisible={fabVisible}
                            onFABInputClick={handleInputClick}
                            onInputChange={handleInputChange}
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
