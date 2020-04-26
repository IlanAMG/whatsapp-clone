import React from 'react'
import FontAwesome from 'react-fontawesome';
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const MessageText = (props:any):JSX.Element => {
    const heure = format(
        props.createAt,
        'HH:mm',
        {locale: fr}
      )
    
    return (
        <div className='messageContainer'>
            <div className={props.msgClass}>
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
