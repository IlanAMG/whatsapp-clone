import { Meteor } from 'meteor/meteor';

import { User, Chat } from './models'
import { Accounts } from 'meteor/accounts-base'
import { ChatsCollection } from './chats'

export const createDummyUsers = (users:User[]):void => {
    users.forEach(user => {
        const {username, profile, password } = user;
        Accounts.createUser({
            username,
            password,
            profile
        });
    });
}

export const createDummyChats = (chats:Chat[]):void => {
    chats.forEach(chat => {
        ChatsCollection.insert(chat)
    });
}

export const findChats = ():Chat[] => {
    return ChatsCollection.find().fetch()
        .map(chatCollection => {
            const otherId:string = findOtherId(chatCollection.participants)
            const { username, profile } =  findOtherUser(otherId)
            return {
                ...chatCollection,
                title: username,
                picture: profile.picture,
            }
        });
}

const findOtherUser = (_id:string) => {
    return Meteor.users.findOne({_id})
}

const findOtherId = (participants: string[]):string => {
    const myId:string = Meteor.userId()
    let otherId:string;

    if (myId === participants[0]) {
        otherId = participants[1]
    } else {
        otherId = participants[0]
    }
    return otherId;
}