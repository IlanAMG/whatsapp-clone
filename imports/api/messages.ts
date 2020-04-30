import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import { Message, MessageType } from './models'

export const MessagesCollection = new Mongo.Collection('Messages');

if (Meteor.isServer) {
    Meteor.publish('messages.all', function() {
        return MessagesCollection.find()
    })
    Meteor.methods({
      'message.insert': function(message) {
        return MessagesCollection.insert(message);
      },

      'message.update': function(_id:string, content:string) {
        return MessagesCollection.update({_id}, {
          $set: {
            content
          }
        })
      },
      'message.update.badges': function(chatId:string, otherId:string) {
        return MessagesCollection.update({
          chatId, senderId: otherId // critères
        }, {
          $set: {
            read: true
          }
        }, {
          multi: true
        })
      },
      'message.delete': function(_id:string) {
        return MessagesCollection.remove(_id);
      }
    })
}

export const dummyMessages:Message[] = [
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut �a va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "anv9oAcunPkizAGfb",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
    {
      chatId: "CwZYRk4ra5tzqnK4E",
      content: "Salut ça va ?",
      createAt: Date.now(),
      type: MessageType.TEXT,
    },
  ]