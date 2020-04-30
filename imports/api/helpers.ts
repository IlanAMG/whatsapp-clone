import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

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

export const findOtherUser = (_id:string) => {
    return Meteor.users.findOne({_id})
}

export const findOtherId = (participants: string[]):string => {
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
    const message:Message[] = MessagesCollection.find({ chatId }, {
        sort: { createAt: -1 }
    }).fetch()
    if (!message[0]) {
        return ChatsCollection.findOne(chatId).lastMessage
    } else {
        return message[0]
    }
}

export const uploadFile = (file:any, isMessage:boolean):void => {
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
            if (isMessage) {
                Meteor.call('images.url', _id, (err, url) => {
                    if (err) {
                        console.log('err url : ', err)
                    } else {
                        console.log('url :', url)
                        Session.set('wwc__imageUrl', url)
                    }
                })
            } else {
                Meteor.call('user.picture', _id, (err, url) => {
                    if (err) {
                        console.log('err url : ', err)
                    } else {
                        console.log('url :', url)
                    }
                })
            }
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

export const getBadges = (chatId:string):number => {
    const participants:string[] = ChatsCollection.findOne(chatId).participants
    const otherId:string = findOtherId(participants)
    const badges:number = MessagesCollection.find({chatId, senderId: otherId, read: false}).count()
    return badges
}

export const updateBadges = (participants:string[], chatId:string):void => {
    const otherId:string = findOtherId(participants);
    Meteor.call('message.update.badges', chatId, otherId, (err, res) => {
        if (err) {
            console.log('err :', err)
        } else {
            console.log('res : ', res)
        }
    })
}