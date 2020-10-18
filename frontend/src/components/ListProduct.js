import React, {useState} from 'react';
import ListCategory from './ListCategory'
import index, { CATEGORIES } from '../constants/index'

const ListProducts = (props) => {

    return (
        <>
        <div className="Container">
            
        {CATEGORIES.map(category => {
                return  <ListCategory key={category._id} title={category.nombre} category = {category.foto}/> 
        })}

            </div>
        
        
        
        </>
    )
}

export default ListProducts