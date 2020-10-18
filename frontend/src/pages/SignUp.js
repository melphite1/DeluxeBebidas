import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import Footer from '../components/Footer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import '../styles/logInSignUp.css'
import background from "../images/deluxebackground.png"



const SignUp = (props) => { 
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        firstName: '', lastName: '', pass: '', mail: ''
    })
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: valor
        })
    }
    const enviarInfo = async e => {
        e.preventDefault()
        //Validacion
        if (nuevoUsuario.firstName === '' || nuevoUsuario.lastName === ''|| nuevoUsuario.pass === '') {
            alert("Campos obligatorios")
        } else {
            const response = props.createUser(nuevoUsuario)
            props.history.push('/')
        }
    }
    
    const responseGoogle = response => {
        props.createUser({
              firstName: response.profileObj.givenName, 
              lastName: response.profileObj.familyName, 
              mail: response.profileObj.email, 
              pass: response.profileObj.googleId, 
            })
      }
    return (
       <>
        <div className="fondoForm" >
            <div className="theBackground" style={{backgroundImage: `url(${background})`}}>
                <div className="formulario">
                <h1>Nuevo usuario</h1>
                <input type="text" name="firstName" onChange={leerInput} placeholder="Nombre" />
                <input type="text" name="lastName" onChange={leerInput} placeholder="Apellido" />
                <input type="mail" name="mail" onChange={leerInput} placeholder="Email" />
                <input type="password" name="pass" onChange={leerInput} placeholder="Contraseña (min 5 caracteres)" />
                <button onClick={enviarInfo}>Registrarme</button>
             
                <div id="botonGoogle">
                    <GoogleLogin
                        clientId="1036652497232-evt9ves8p9a3kqs1uu47f769ueldgr2n.apps.googleusercontent.com"
                        buttonText="Ingresar con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                        </div>
                    <button className="goToLogIn"><NavLink to='/login' style={{textDecoration: "none", color:"white"}}> Ya estoy registrado </NavLink></button>
                </div>
                <div className="divGoBack">
                    <button className="goBack"><NavLink to='/' style={{textDecoration: "none", color:"white"}}> volver </NavLink></button>
                </div>
            </div>
        </div>

        </>
    )
}
const mapDispatchToProps = {
    createUser: userActions.createUser
}
export default connect(null, mapDispatchToProps)(SignUp)