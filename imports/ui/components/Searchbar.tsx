import React from 'react'
import FontAwesome from 'react-fontawesome';

import StyledSearchbar from '../elements/StyledSearchbar';

export const Searchbar = (props:any):JSX.Element => {
    return (
        <StyledSearchbar>
            <label className='searchbar--label'>
                <FontAwesome 
                    name='search'
                    className='searchbar--icon'
                />
                <input 
                    className='searchbar--input'
                    placeholder='Rechercher ou Démarrer une discussion'    
                />
            </label>
        </StyledSearchbar>
    )
}
