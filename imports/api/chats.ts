import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import { Chat } from './models';

export const ChatsCollection = new Mongo.Collection<Chat>('Chats')

export const dummyChats:Chat[] = [
    {  
        //mongoDB charge seul l'id
        title: '',
        picture: '',
        participants: ['x7qHLdLQk87cH5mLz', 'ZW26b99oNDGnwczrC'],
        lastMessage: {
            content: 'Salut, ça va ?',
            createAt: moment().toDate()
            // createAt: Date.now()
        }
    },
    {  
        //mongoDB charge seul l'id
        title: '',
        picture: '',
        participants: ['Dx4rqG8MXyW6Zv3AL', 'x7qHLdLQk87cH5mLz'],
        lastMessage: {
            content: 'Yo, bien ?',
            createAt: moment().toDate()
            // createAt: Date.now()
        }
    },
    {  
        //mongoDB charge seul l'id
        title: '',
        picture: '',
        participants: ['S3fDHK5Soi66BSnRi', 'Dx4rqG8MXyW6Zv3AL'],
        lastMessage: {
            content: 'Bonjour !!',
             createAt: moment().toDate()
            //  createAt: Date.now()
        }
    }
]

if (Meteor.isServer) {
    Meteor.publish('chats.all', function() {
        return ChatsCollection.find();
    });
    Meteor.publish('chats.mine', function() {
        return ChatsCollection.find({
            participants: {
                $in: [this.userId] //$in est une syntaxe méteor qui dit "doit inclure", et this.userId c'est un moyen que nous donne meteor pour accéder à l'id de l'user qui est connecté
            }
        })
    })
}