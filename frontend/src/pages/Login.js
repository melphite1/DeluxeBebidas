import React from 'react';
//import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import '../styles/logInSignUp.css'
import background from "../images/deluxebackground.png"
import { toast } from 'react-toastify';

class Login extends React.Component {
    state = {
        mail: '',
        pass:''
    }
    leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        this.setState({
            [campo]: valor
        })
    }
    enviarInfo = async e => {
        e.preventDefault()
        //Validacion
        if (this.state.mail === '' || this.state.pass === '') {
            toast.error("Campos obligatorios")
        } else {
            const usuarioALoguear = {mail: this.state.mail, pass: this.state.pass}
            const respuesta = await this.props.loguearUser(usuarioALoguear)
                this.props.history.push('/')
        }
    }
    responseGoogle = respuesa => {
        this.props.loguearUser({
        mail: respuesa.profileObj.email, 
        pass: respuesa.profileObj.googleId, 
     })
   }
    render(){
        return (
            <>
           <div className="mainContainer fondoForm">
                <div className="theBackground" style={{backgroundImage: `url(${background})`}}>  
                    <form className="formulario">
                        <h1>Ingresar a mi cuenta</h1>
                        <input type="mail" name="mail" onChange={this.leerInput} placeholder="Email" />
                        <input type="password" name="pass" onChange={this.leerInput} placeholder="Contraseña (min 5 caracteres)" />
                        <button onClick={this.enviarInfo}>Ingresar</button>
						<NavLink to="/passRecovery" ><h4 style={{marginTop: '5px'}}>Olvide mi contraseña</h4></NavLink>
                        <div id="botonGoogle">
                            <GoogleLogin
                            clientId="1036652497232-evt9ves8p9a3kqs1uu47f769ueldgr2n.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <button className="goToLogIn"><NavLink to='/signup' style={{textDecoration: "none", color:"white"}}> Crear cuenta </NavLink></button>
                    </form>
                    <div className="divGoBack">
                        <button className="goBack"><NavLink to='/' style={{textDecoration: "none", color:"white"}}> volver </NavLink></button>
                    </div>
                </div>
           </div>
           </>
        )
    }
}  
const mapDispatchToProps = {
    loguearUser: userActions.loginUser

}

export default connect(null, mapDispatchToProps)(Login)
