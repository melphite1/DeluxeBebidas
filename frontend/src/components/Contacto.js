import React, {useState} from 'react';
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import "../styles/Contact.css"

const Contacto = (props) => {
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        mail: '',
        asunto: '',
        mensaje: ''
})
const inputHandler = (e) => {
    const valor = e.target.value;
    const campo = e.target.name;
    setUser({
            ...user,
            [campo]: valor
    })
}
const [send, setSend] = useState({
    status: false
})
const submitHandler = async (e) => {
        e.preventDefault()
        const uname = RegExp(/^[a-zA-Z0-9._]+$/)
		const reMail = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
        if (user.nombre === '' || user.apellido === '' || user.mail === '' || user.telefono === '' || user.mensaje === '') {
            toast.error("Por favor complete todos los campos")
        
        } else if (!uname.test(user.nombre)) {
            toast("Tu nombre solo puede contener Letras, Numeros, '_' and '.'")

        } else if (!uname.test(user.apellido)) {
            toast("Tu nombre solo puede contener Letras, Numeros, '_' and '.'")
        } else if (user.mail.length < 6) {
            toast("Tu mail debe contener al menos")
        } else if (user.telefono.length < 6) {
            toast("Tu numero al menos debe contener 10 digitos")
        } else if (!reMail.test(user.mail)) {
            toast("tu mail debe de ser valido, por ejemplo: 'example@server.com'")
        
        } else if (!uname.test(user.apellido)) {
            toast("Tu mensaje solo puede contener Letras, Numeros, '_' and '.'")
        
        } else {
            setUser({
                nombre: '',
                apellido: '',
                telefono: '',
                mail: '',
                asunto: '',
                mensaje: ''
        })
            toast.success("Gracias por enviarnos tu mensaje")

        }
}

return (
    <div className="contactanos">
        <h2 className="title">CONTACTANOS</h2>
        <h5>Por mail, por whatsapp, por teléfono o completando el formulario de contacto.</h5>
        <div className="sign">
            <form className="theForm">
                <div className="inputBox">
                    <input type="text" name="nombre" id="nombre"  onChange={inputHandler} placeholder="Nombre" value={user.nombre}/>
                </div>
                <div className="inputBox">
                    <input type="text" name="apellido" id="apellido"  onChange={inputHandler} placeholder="Apellido" value={user.apellido}/>  
                </div>
                <div className="inputBox">
                    <input type="text" name="telefono" id="telefono"  onChange={inputHandler} placeholder="Telefono" value={user.telefono}/>
                </div>
                <div className="inputBox">
                    <input type="text" name="mail" id="mail"   onChange={inputHandler} placeholder="Email" value={user.mail}/>
                </div>
                <div className="inputBox">
                    <input type="text" name="asunto" id="asunto"   onChange={inputHandler} placeholder="Asunto" value={user.asunto}/>
                </div>
                <div className="inputBox">
                    <textarea  name="mensaje" id="mensaje" onChange={inputHandler} placeholder="Escribe tu mensaje" value={user.mensaje}/> 
                </div>
                <button onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Enviar' : <i className="fas fa-spinner fa-pulse"></i>}</button>
            </form>
            <div className="theInfo">
                <div className="nuestraInfo">
                    <h3>TELÉFONO:</h3>
                    <p>011 4858-3809</p>
                </div>
                <div className="nuestraInfo">
                    <h3>WHATSAPP:</h3>
                    <p>+54 9 11 2425-6147</p>
                </div>
                <div className="nuestraInfo">
                    <h3>E-MAIL: </h3>
                    <p>deluxelicoreria@gmail.com</p>
                </div>
                <div className="nuestraInfo">
                    <h3>ATENCION: </h3>
                    <p>Lunes a Miércoles de 9:00 a 18:00 / Jueves a Viernes 9:00 a 19:00</p>
                </div>
                             
            </div>
	    </div>
    </div>    
)

}
const mapStateToProps = state => {
    return{
  
    }
  }
  
  export default connect(mapStateToProps) (Contacto)