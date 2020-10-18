import React, {useState} from 'react';
import {connect} from 'react-redux'
import "../styles/Home.css"
import alcohol from "../images/alcoholbanner.jpg"
import decoration from "../images/decoration.png"
import decoration2 from "../images/decoration2.png"
import Categories from '../components/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contacto from '../components/Contacto';
import { CATEGORIES } from '../constants';
const Home = (props) => {

    return (
        <>
           <Header />
            <div className="banner" style={{backgroundImage:`url(${alcohol})`}}>
        </div>
        <img src={decoration} className="homeBackgroundOne"/>
        <img src={decoration2} className="homeBackgroundTwo"/>
        <div className="whoWeAre">
            <h2>QUIENES SOMOS</h2>
            <p>Somos una empresa que distribuye alcohol de calidad, tenemos las bebidas alcoholicas mas exclusivas para que nuestros clientes disfruten. Buscamos brindar una experiencia y producto de primera calidad.</p>
            <h5>Si estas buscando bebidas exclusivas para disfrutar aqui vas a poder encontrarlas</h5>
        </div>
        <div className="categories">
            <h2>CATEGORIAS</h2>
            <div className="allCategories">
                {CATEGORIES.map(conjunto => {
				  return (
					<div key={conjunto} >
                      <Categories categorie={conjunto}/>
                  	</div>
                  )
				})} 
            </div>
        </div>
        <Contacto />
        <Footer/>
        </>
    )

}


const mapStateToProps = state => {
    return{
		product: state.productReducer,
		user: state.userReducer
    }
  }
  
  export default connect(mapStateToProps) (Home)
