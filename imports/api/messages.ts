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