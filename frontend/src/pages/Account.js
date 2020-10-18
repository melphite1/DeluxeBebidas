import React, { useEffect, useReducer, useState } from 'react';
import { connect } from "react-redux"
import "../styles/account.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import userActions from '../redux/actions/userActions';
import productActions from '../redux/actions/productActions';
import ProductLike from "../components/productLike";
import Orders from '../components/Orders';
import Order from '../components/Order';
import OrderProfile from '../components/OrderProfile';
import OrdersProfile from '../components/OrdersProfile';


function Account(props) {

    const [editInfo, setEditInfo] = useState({
        editInfo: false,

    })
    const [user, setUser] = useState({

    })
    const [orders, setOrders] = useState({
        showOrders: false
    })

    const [abrir, setAbrir] = useState(false)
    useEffect(() => {
        props.productsList()

    }, [])


    const openDiv = () => {
        setAbrir(!abrir)
    }


    const handleClick = e => {
        if (editInfo.editInfo === false) {
            setUser({
                ...user,
                firstName: props.firstName,
                lastName: props.lastName,
                shippingAddress: {
                    street: props.shippingAddress.street,
                    dpto: props.shippingAddress.dpto,
                    phone: props.shippingAddress.phone,
                    notes: props.shippingAddress.notes,
                    number: props.shippingAddress.number,
                    who: props.shippingAddress.who,
                },
                billingAddress: {
                    name: props.billingAddress.name,
                    cuit: props.billingAddress.cuit,
                    type: props.billingAddress.type,
                    phone: props.billingAddress.phone,
                    notes: props.billingAddress.notes,
                }


            })

            setEditInfo({
                editInfo: true
            })
        } else {
            setEditInfo({
                editInfo: false
            })
        }

    }


    const handlData = e => {
        const valor = e.target.value

        setUser({
            ...user,
            [e.target.name]: valor,
            billingAddress: {
                ...user.billingAddress,
                [e.target.id]: valor,

            },
            shippingAddress: {
                ...user.shippingAddress,
                [e.target.name]: valor,
            }
        })
    }
    const SendInfo = async e => {
        e.preventDefault();
        // send.status = true
        // setSend({ status: true })
        // if (validation(user)) {

        props.modifyUser(user)

        // setError({
        //     ...error,
        //     ok: true
        // })
        setEditInfo({
            editInfo: false
        })

    }
    const showOrders = async () => {
        if (orders.showOrders === true) {
            //accion
            setOrders({
                showOrders: false
            })
        } else {
            await props.UserOrders(props.token)

            setOrders({
                showOrders: true

            })
        }
	}
	
    return (
        <>
            <Header />
            {orders.showOrders ? <div className="generaAccount" >
                <div className="myInfo">
                    {/*<div className="yourProfilePhoto">
                    {editInfo.editInfo ?<input type="file" name="pic" onChange={handlData}></input> : <div>PHOTO</div> }
                </div>*/}
                    <div className='title'>Tus Datos</div>
                    <div className="yourProfileInfo" >
                        <div className="myPersonalInfo">
                            <div className="theInfo">  {editInfo.editInfo ? <input type="text" name="firstName" placeholder="Nombre" onChange={handlData} value={user.firstName} ></input> : <p><span>Nombre: </span>{props.firstName}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="lastName" placeholder="Apellido" onChange={handlData} value={user.lastName}></input> : <p><span>Apellido:</span> {props.lastName}</p>}</div>
                        </div>
                        <div className="buttonsInfo">

                            <div className="theInfo">  {editInfo.editInfo ? <button onClick={handleClick} className="cancelButton" >Cancelar</button> : null}</div>
                            <div className="buttonsInfo">
                                <div className="theInfo">  {orders.showOrders ? <button onClick={showOrders} >Volver</button> : <button onClick={showOrders} >Ver ordenes</button>}</div>
                            </div>
                        </div>
                    </div>
                </div>

               <OrdersProfile orders={props.orders} />

            </div> : <div className="generaAccount" >
                    <div className="myInfo">
                        {/*<div className="yourProfilePhoto">
                    {editInfo.editInfo ?<input type="file" name="pic" onChange={handlData}></input> : <div>PHOTO</div> }
                </div>*/}
                        <div className='title'>Tus Datos</div>
                        <div className="yourProfileInfo" >
                            <div className="myPersonalInfo">
                                <div className="theInfo">  {editInfo.editInfo ? <input type="text" name="firstName" placeholder="Nombre" onChange={handlData} value={user.firstName} ></input> : <p><span>Nombre: </span>{props.firstName}</p>}</div>
                                <div className="theInfo"> {editInfo.editInfo ? <input type="text" name="lastName" placeholder="Apellido" onChange={handlData} value={user.lastName}></input> : <p><span>Apellido:</span> {props.lastName}</p>}</div>
                            </div>
                            <div className="buttonsInfo">
                                <div className="theInfo">  {editInfo.editInfo ? <button onClick={SendInfo} >Guardar informacion</button> : <button onClick={handleClick} >Editar perfil</button>}</div>
                                <div className="theInfo">  {editInfo.editInfo ? <button onClick={handleClick} className="cancelButton" >Cancelar</button> : null}</div>
                                <div className="buttonsInfo">
                                    <div className="theInfo">  {orders.showOrders ? <button onClick={showOrders} >Volver</button> : <button onClick={showOrders} >Ver ordenes</button>}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="myBillingInfo">
                        <div ><div className='title'>Datos de Envio</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Calle" onChange={handlData} defaultValue={user.shippingAddress.street} name="street"></input> : <p><span>Calle</span> {props.shippingAddress.street}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Altura" onChange={handlData} defaultValue={user.shippingAddress.number} name="number"></input> : <p><span>Altura</span> {props.shippingAddress.number}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Piso" onChange={handlData} defaultValue={user.shippingAddress.dpto} name="dpto"></input> : <p><span>Piso/Dpto</span> {props.shippingAddress.dpto}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Quien recibe?" onChange={handlData} defaultValue={user.shippingAddress.who} name="who"></input> : <p><span>Quien recibe?</span> {props.shippingAddress.who}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Telefono" onChange={handlData} defaultValue={user.shippingAddress.phone} name="phone" ></input> : <p><span>Telefono</span> {props.shippingAddress.phone}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Notas" onChange={handlData} defaultValue={user.shippingAddress.notes} name="notes"></input> : <p><span>Notas</span> {props.shippingAddress.notes}</p>}</div>
                        </div>
                        <div><div className='title'>Datos de facturacion</div>
                            <div className="theInfo">   {editInfo.editInfo ? <input type="text" placeholder="Nombre y apellido / Nombre de fantasia" id="name" onChange={handlData} defaultValue={user.billingAddress.name}></input> : <p><span>Nombre</span> {props.billingAddress.name}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="CUIT/CUIL/DNI" onChange={handlData} id="cuit" defaultValue={user.billingAddress.cuit}></input> : <p><span>CUIT/CUIL/DNI</span> {props.billingAddress.cuit}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Tipo de comprobante" onChange={handlData} id="type" defaultValue={user.billingAddress.type}></input> : <p><span>Tipo de comprobante</span> {props.billingAddress.type}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Telefono" onChange={handlData} id="phone" defaultValue={user.billingAddress.phone}></input> : <p><span>Telefono</span> {props.billingAddress.phone}</p>}</div>
                            <div className="theInfo"> {editInfo.editInfo ? <input type="text" placeholder="Notas" onChange={handlData} defaultValue={user.billingAddress.notes} id="notes"></input> : <p><span>Notas</span> {props.billingAddress.notes}</p>}</div>
                        </div>
                        <div ><div className='title'>Productos que deseo</div>

                            {props.productFound.length === undefined ?

                                <p>No products available</p> :

                                props.productFound.map(product => {
                                    if (props.wishlist.includes(product._id)) {

                                        return <>
                                            <p><ProductLike producto={product} />  </p>
                                        </>

                                    }

                                })
                            }
                        </div>
                    </div>
                </div>}

            <Footer />
        </>
    );
}
const mapStateToProps = state => {
    return {

        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        shippingAddress: state.userReducer.shippingAddress,
        billingAddress: state.userReducer.billingAddress,
        phone: state.userReducer.phone,
        wishlist: state.userReducer.wishlist,
        productFound: state.productReducer.productFound,
        token: state.userReducer.token,
        orders: state.userReducer.orders,
        id: state.userReducer.id
    }
}

const mapDispatchToProps = {

    modifyUser: userActions.modifyUser,
    productsList: productActions.getAllProducts,
    addToWishList: userActions.addToWishList,
    removeFromWishList: userActions.removeFromWishList,
    getInfo: userActions.getUserInfo,
    UserOrders: userActions.getUserOrder

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)