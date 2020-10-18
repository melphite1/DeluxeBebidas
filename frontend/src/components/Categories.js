import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import "../styles/Home.css"

const Categories = (props) => {
  
    return(
        <Link to={`/products/${props.categorie.foto}`} style={{textDecoration: "none"}}>
            <div className="TheCategorie">
                <img src={require(`../images/${props.categorie.foto}.png`)} />
                <p>{props.categorie.nombre}</p>
            </div>
      </Link>
   )
}



const mapStateToProps = state => {
  return{

  }
}






export default connect(mapStateToProps) (Categories)