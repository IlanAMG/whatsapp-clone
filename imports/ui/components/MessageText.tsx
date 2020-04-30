import React from 'react'
import FontAwesome from 'react-fontawesome';
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const MessageText = (props:any):JSX.Element => {
    const { id, onClick } = props 
    const heure = format(
        props.createAt,
        'HH:mm',
        {locale: fr}
      )
    
      const handleClick = (e:React.MouseEvent, msgId:string, type:string):void => {
        const message = e.currentTarget
        if (message.classList.contains('message--mine')) {
            onClick(msgId, type)
        } else {
            return;
        }
      }
    
    return (
        <div className='messageContainer'>
            <div onClick={(e) => handleClick(e, id, 'text')} className={props.msgClass}>
                <p>{props.content}</p>
                <div className='detailsContainer'>
                    <span>
                        {heure}
                    </span>
                    {
                        props.ownership === 'mine' ?
                            <FontAwesome
                                name='check-double'
                            />
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
