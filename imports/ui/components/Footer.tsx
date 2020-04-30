import React from 'react'
import FontAwesome from 'react-fontawesome';

import StyledFooter from '../elements/StyledFooter';
import { MessageType } from '../../api/models';

export const Footer = (props:any):JSX.Element => {

    const [inputValue, setInputValue] = React.useState<string>('')
    const [iconName, setIconName] = React.useState<string>('microphone')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputValue(e.target.value)
        const name:string = e.target.value !== '' ? 'paper-plane' : 'microphone'
        setIconName(name)
    }

    const handleClick = ():void => {
        if (iconName === 'microphone') {
            return
        }
        props.onSend(inputValue, MessageType.TEXT)
        setInputValue('')
        setIconName('microphone')
    }

    const handleEnter = React.useCallback(e => {
        const { keyCode } = e;
    
        if (keyCode === 13 && inputValue) {
            if (iconName === 'microphone') {
                return
            }
            props.onSend(inputValue, MessageType.TEXT)
            setInputValue('')
            setIconName('microphone')
        } 
      }, [inputValue]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleEnter);
        return () => {
          window.removeEventListener('keydown', handleEnter);
        };
      }, [handleEnter]);

    return (
        <StyledFooter>
            <FontAwesome
                className='iconFooter'
                name='smile'
            />
            <label className='message--label'>
                <input 
                    className='message--input'
                    placeholder='Taper un message...'
                    value={inputValue}
                    onChange={handleChange} 
                />
            </label>
            <FontAwesome
                className='iconFooter'
                name={iconName}
                onClick={handleClick}
            />
        </StyledFooter>
    )
}
