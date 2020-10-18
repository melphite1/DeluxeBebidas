import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import '../styles/logInSignUp.css'
import background from "../images/deluxebackground.png"
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom';


class PassRecovery extends React.Component{

    state={
        mail:"",
        error:"",
        disabled: false
    }

    getForm = e =>{
        e.preventDefault()
        const value = e.target.value
        this.setState({
            ...this.state,
            mail: value,
            error:""
        })
        
    
    }


    submit =  async e => {
 
        e.preventDefault()

        this.setState({
            ...this.state,
            disabled: true
        })
        if (this.state.error ==="" ){
            
            const sendMail = await this.props.sendMail(this.state.mail) 
            if (sendMail === false){
                this.setState({
                    error: "That email address is not associated with an existing account"
                })   
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            } else{
                toast.info("Mail de recuperacion enviado. Chequea tu casilla de mail")
                this.props.history.push('/')
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            }
        }
    }
    render(){
        
        return(
            <>
            <Header />
            <div className="fondoForm" >
            <div className="theBackground" style={{backgroundImage: `url(${background})`}}>
            <h3 className="titleRecovery">CAMBIA TU CONTRASEÑA</h3>
            <div style={{marginTop:"2rem",marginBottom:"1rem"}} className="signContainer">
                <h4 style={{color:"whitesmoke",textAlign:"center",fontSize:"1rem",margin:"1rem"}}>Si olvidó su contraseña por favor ingrese su correo electrónico</h4>
                <div className="formulario">
                    <span className={this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                    <input className="account" onChange={this.getForm} name="mail" type="text" placeholder="Tu email"></input>
                    <button disabled={this.state.disabled} className="send" onClick={this.submit}>Enviar</button>
                </div>
            </div>
               <div className="divGoBack">
                    <button className="goBack"><NavLink to='/login' style={{textDecoration: "none", color:"white"}}> volver </NavLink></button>
                </div>
            </div>
            <Footer/>
            </div>
            </>
        )
    }
}


const mapDispatchToProps ={
    sendMail: userActions.sendMail
}

export default connect (null, mapDispatchToProps)(PassRecovery)