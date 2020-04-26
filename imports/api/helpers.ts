import { Meteor } from 'meteor/meteor';

import { User, Chat, Message } from './models'
import { Accounts } from 'meteor/accounts-base'
import { ChatsCollection } from './chats'
import { MessagesCollection } from './messages';
import { ImagesCollection } from './images';

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

export const createDummyMessages = (messages:Message[]):void => {
    messages.forEach(message => {
        MessagesCollection.insert(message)
    })
}

export const findChats = ():Chat[] => {
    return ChatsCollection.find().fetch()
        .map(chatCollection => {
            const otherId:string = findOtherId(chatCollection.participants)
            const { username, profile } =  findOtherUser(otherId)
            const lastMessage:Message = findLastMessage(chatCollection._id)
            return {
                ...chatCollection,
                title: username,
                picture: profile.picture,
                lastMessage: {
                    ...lastMessage
                }
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

const findLastMessage = (chatId:string):Message => {
    return MessagesCollection.find({ chatId }, {
        sort: { createAt: -1 }
    }).fetch()[0]
}

export const uploadFile = (file:any):void => {
    const fileUpload = ImagesCollection.insert({
        file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true
    }, false)
    fileUpload.on('start', () => {
        console.log('start')
    })

    fileUpload.on('end', (err, fileObj) => {
        console.log('end', fileObj)
        if (err) {
            console.log('err upload', err)
        } else {
            const _id:string = fileObj._id;
            Meteor.call('images.url', _id, (err, res) => {
                if (err) {
                    console.log('err url : ', err)
                } else {
                    console.log('url :', res)
                }
            })
        }
    })

    fileUpload.on('err', (err, fileObj) => {
        console.log('err', err)
    })

    fileUpload.on('progress', (progress, fileObj) => {
        console.log('progress', progress)
    })
    
    fileUpload.start()
}