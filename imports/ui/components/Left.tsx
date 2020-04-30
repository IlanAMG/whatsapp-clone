import React from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import StyledLeft from '../elements/StyledLeft';
import { Avatar } from './Avatar';
import ChatList from './ChatList';
import { Header } from './Header';
import { LeftSide } from './LeftSide';
import { Status } from './Status';
import { Searchbar } from './Searchbar';
import { LeftSideHeader } from './LeftSideHeader';
import { LeftSideForm } from './LeftSideForm';
import UsersList from './UsersList';
import { ChatsCollection } from '../../api/chats';

const Left = (props:any):JSX.Element => {
    const { chats, onChatClick, selectedChat, otherProfileVisible, picture } = props
    const [leftSideVisible, setLeftSideVisible] = React.useState<boolean>(false)
    const [userListVisible, setUserListVisible] = React.useState<boolean>(false)
    const [pattern, setPattern] = React.useState<string>('')
    const [users2, setUsers2] = React.useState<any>([])

    const icons:any[] = [
        {name:'circle-notch', func: () => {}},
        {name:'comment-alt', func: () => {
            setUsers2([])
            setPattern('')
            showUsersList()
        }},
        {name:'ellipsis-v', func: () => {}}
    ]

    const showUsersList = ():void => {
        setLeftSideVisible(true);
        setUserListVisible(true);
    }
    
    const toggleLeftSide = ():void => {
       if (!leftSideVisible) {
           setLeftSideVisible(true)
       } else {
            setUsers2([])
            setPattern('')
            setLeftSideVisible(false)
            setUserListVisible(false)
       }
    }

    const userItemClick = (_id:string, username:string, picture:string):void => {
        toggleLeftSide()
        props.onUserItemClick(_id, username, picture)
    }

    const handleUserSearch = (pattern:string, placeholder:string):void => {
        setPattern(pattern)
        if (placeholder === 'Chercher Contact') {
            setUsers2(Meteor.users.find({
                _id: {$ne: Meteor.userId()},
                username: {$regex: pattern, $options: 'i'}
            }, {
                sort: {
                    username: 1
                }
            }).fetch())
        } else {
            setUsers2(ChatsCollection.find({
                _id: {$ne: Meteor.userId()},
                title: {$regex: pattern, $options: 'i'}
            }, {
                sort: {
                    title: 1
                }
            }).fetch())
        }
    }

    const renderLeftSideComponents = ():JSX.Element => {
        if (userListVisible) {
            return (
                <>
                    <LeftSideHeader title='Nouvelle Discussion' toggleLeftSide={toggleLeftSide}/>
                    <Searchbar
                        userList
                        placeholder='Chercher Contact' 
                        onSearch={handleUserSearch}
                    />
                    <UsersList 
                        onUserItemClick={userItemClick}
                        pattern={pattern}
                        users2={users2}
                    />
                </>
            )
        } else if (leftSideVisible) {
            return (
                <>
                    <LeftSideHeader title='Profil' toggleLeftSide={toggleLeftSide}/>
                    <div className="LS--avatar">
                        <Avatar leftSide big avatar_url={picture}/>
                    </div>
                    <LeftSideForm type='username' />
                    <div className='LS--desc'>
                        <span>Ce n'est pas votre nom d'utilisateur ou votre code pin. Ce nom sera visible auprès de vos contacts Whatsapp.</span>
                    </div>
                    <LeftSideForm type='actu' />
                </>
            )
        }
    }


    return (
        <StyledLeft otherProfileVisible={otherProfileVisible} >
            {
                !leftSideVisible ?
                    <>
                        <Header icons={icons} iconClass='greyIcon'>
                            <Avatar
                                onAvatarClick={toggleLeftSide}
                                avatar_url={picture} 
                            />
                        </Header>
                        <Status />
                        <Searchbar
                            chatList
                            onSearch={handleUserSearch} 
                            placeholder='Rechercher ou Démarrer une discussion' 
                        />
                        <ChatList 
                            pattern={pattern} 
                            users2={users2} 
                            selectedChat={selectedChat} 
                            chats={chats} 
                            onChatClick={onChatClick} 
                        />
                    </>
                :   
                    <LeftSide>
                        {renderLeftSideComponents()}
                    </LeftSide>
            }
        </StyledLeft>
    )
}

export default withTracker(() => {
    return {
        picture: Meteor.user().profile.picture
    }
})(Left)