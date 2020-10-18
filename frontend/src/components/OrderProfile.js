import React, { useState } from 'react';
import { connect } from "react-redux"
import orderActions from '../redux/actions/orderActions';
import { toast } from 'react-toastify';


function OrderProfile(props) {

    const [abrir, setAbrir] = useState(false)
    const openDiv = () => {
        setAbrir(!abrir)
    }

    let sum = 0
    props.data.items.map(order => {
        sum += order.price * order.quantity
    })

    if (props.data === undefined) {
        return <></>
    } else {
        return (
            <>
                <div className="theTitleDiv">
                    <div onClick={openDiv} className="theTitlesList">
                        <h2>Orden número {props.data._id.substr(props.data._id.length-6,5)} Estado: <span style={props.data.status === "Pendiente" ? {color: "yellow"} : props.data.status === "Entregado" ? {color: 'green'} : {}}>{props.data.status}</span></h2>

                        {abrir ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>}
                    </div>
                    {abrir
                        ? (<>
						<div className="orderData">
							<div className="shippingData">
								<span>Datos de envio</span>
								<table>
									<tr>
										<td>Dirección:</td>
										<td>{props.data.shippingAddress.street} {props.data.shippingAddress.number} Dto: {props.data.shippingAddress.dpto}</td>
									</tr>
									<tr>
										<td>Recibe:</td>
										<td>{props.data.shippingAddress.who}</td>
									</tr>
									<tr>
										<td>Telefono:</td>
										<td>{props.data.shippingAddress.phone}</td>
									</tr>
									<tr>
										<td>Notas:</td>
										<td>{props.data.shippingAddress.notes}</td>
									</tr>
								</table>
							</div>
							<div className="billingData">
								<span>Datos de facturación</span>
								<table>
									<tr>
										<td>Nombre:</td>
										<td>{props.data.billingAddress.name}</td>
									</tr>
									<tr>
										<td>CUIT:</td>
										<td>{props.data.billingAddress.cuit}</td>
									</tr>
									<tr>
										<td>Tipo de factura:</td>
										<td>{props.data.billingAddress.type}</td>
									</tr>
									<tr>
										<td>Telefono:</td>
										<td>{props.data.billingAddress.phone}</td>
									</tr>
									<tr>
										<td>Notas:</td>
										<td>{props.data.billingAddress.note}</td>
									</tr>
								</table>
							</div>
							<div className="itemsData">
								<table>
									<thead>
										<tr>
											<th>Cantidad</th>
											<th>Descripción</th>
											<th>Precio unitario</th>
											<th>Precio total</th>
										</tr>
									</thead>
									{props.data.items.map(item => {
										return (<tr>
												<td>{item.quantity}</td>
												<td>{item.title}</td>
												<td>$ {item.price}</td>
												<td>$ {item.price * item.quantity}</td>
												</tr>)
									})}
									<tr>
										<td colSpan={3} className="total">TOTAL</td>
										<td>$ {sum}</td>
									</tr>
								</table>
							</div>
						</div>
						</>)
                        : <></>}
                </div>

            </>

        )
    }
}
const mapDispatchToProps = {
    terminarOrden: orderActions.terminarOrden
}
export default connect(null, mapDispatchToProps)(OrderProfile)