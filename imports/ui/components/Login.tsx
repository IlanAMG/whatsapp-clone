import React from 'react';
import { Meteor } from 'meteor/meteor'

import { RightImg } from './RightImg';
import { FormLogin } from './FormLogin';

export const Login = (props:any):JSX.Element => {

    const messageText:string = "Connectez-vous afin de lancer une conversation.";

    const handleLogin = (state:any):void => {
        const { password, username, phone } = state
        Meteor.call('user.login', state, (err, res) => {
            if (err) {
                console.log('error login :', err)
            } else {
                console.log('resultat', res)
                Meteor.loginWithPassword(username, password, (err) => {
                    if (err) {
                        console.log('error connexion :', err)
                    } else {
                        console.log('no err')
                        props.history.push('/chats');
                    }
                })
            }
        })
    }

    return (
        <RightImg messageText={messageText} >
            <FormLogin onLogin={handleLogin} />
        </RightImg>
    )
}
