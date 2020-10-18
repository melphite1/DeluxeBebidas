import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/productFull.css"
import vino from "../images/botella.png"
import Comment from '../components/Comment';
import userActions from "../redux/actions/userActions"
import { toast } from "react-toastify"
import productActions from '../redux/actions/productActions';
import { CATEGORIES, RUTA_API } from '../constants';
import decoration2 from "../images/decoration3.png"
import Rate from '../components/Rate';

const ProductFull = (props) => {
    const [product, setproduct] = useState({
       product: 1
    })
    const[update, setUpdate]=useState(false)

    const [comment, setComment] = useState({
		comment: "",
        name: "",
        productId: "",
        id: ""
	})
    useEffect(() => {
		window.scroll(0,0)
		const gR = async () => {
			await props.dataProduct(props.match.params.id)
			await props.getComments(props.match.params.id)
		}
		gR()
		setUpdate(false)
	}, [update])

	const readComment = e => {
		const text = e.target.value
		const comment = e.target.name
		setComment({
			...comment,
			[comment]: text,
            name:`${props.firstName} ${props.lastName}`,
            productId: props.product._id,
            id: props.id
		})
	}
	const sendComment = async e => {
        e.preventDefault()
        setUpdate(true)
		if (props.token) {
            if (comment.comment === '' ) {
                toast("por favor escriba un comentario")
            }else{
            props.newComment(comment)
			setComment({
				...comment,
			    comment: "",
			})
			toast.success("Su comentario fue publicado.")
            }

		} else {
			toast.error("Es necesaria una cuenta para publicar un comentario")
        }
    
       
    }
    const restar = async e => {
        e.preventDefault()
        if (product.product > 1){
            setproduct({
                product: product.product - 1
            })

        }
    }
    const sumar = async e => {
		e.preventDefault()
		if(product.product < props.product.stock) {
            setproduct({
                product: product.product + 1
            })
		}
	}
	
	const addHandler = () =>{
		props.addToCart(props.product._id, product.product); 
		props.product.stock = props.product.stock - product.product;
		setproduct({
			product: 1
		})
	}

	const stars = (rating) => {
		let total = 0
		rating.map(rate => total += parseInt(rate))
		const prom = total / rating.length
		switch (Math.round(prom)) {
			case 1:
				return (<>
				        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
				</>)
				break;
			case 2:
				return (<>
				        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
				</>)
				break;
			case 3:
				return (<>
				        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
				</>)
				break;
			case 4:
				return (<>
				        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
				</>)
				break;
			case 5:
				return (<>
				        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
				</>)
				break;
		
			default:
				return (<>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
			</>)
				break;
		}
	}

    return(
        <>
        <Header/>
        <div >
        <img src={decoration2} className="homeBackgroundTwoo"/>
            <div className="Classbanner">
                <img src={vino}/>
                <p>{CATEGORIES.map(cat => {
					return cat.foto === props.product.category && cat.nombre
				})}</p>
            </div>
            <div className="infoProduct">
                <div className="allInformation">
                    <img src={`${RUTA_API}/${props.product._id}.jpg`}/>
                    <div>
                    <div className="nameAndRating">
                    <h2>{props.product.title}</h2>
                    <div className="ratings">
                        {props.product.rating && stars(props.product.rating)}
						{props.product.rating && (props.product.rating.length === 0 ? "  N/A" : `  (${props.product.rating.length})`)}
                    </div>
                    </div>
                    <p className="units">{props.product.stock === 0 ? "Sin stock" : props.product.stock < 5 
                    ? "Ultimas unidades"
                    : ""} </p>
                    <p className="price">$ {props.product.price}</p>
                    <p className="description">{props.product.description}</p>
                    <div className="quantity">
                        {props.product.stock !== 0 && (<><button onClick={restar} className="plus"> -</button>
                        <p>{product.product}</p>
                        <button onClick={sumar} className="plus">+</button>
                        <button className="addToBag" onClick={addHandler}>Añadir al pedido<i className="fas fa-cart-plus"></i></button></>)}
                    </div>
					<div className="aditionalInfo">
						<p>{props.product.ml} ml</p>
						<p>{props.product.alcPct}% alc</p>
					</div>
                </div>
                </div>
				{props.token !== '' && <div className="rating">
						<Rate dato={props.product._id} rates={props.rates} setUpdate={setUpdate} v={update} />
				</div>}
                <div className="theComments">
                <h2>Comentarios</h2>
			        <div className="scrollComments">
                        { props.comments === null || props.comments === undefined
                        ? <p>Todavia no hay comentarios, se el primero en comentar!</p>
                        : props.comments.map((comentario, index) => {
                            return <Comment key={index} fx={setUpdate} data={comentario} />
                        })}
			        </div>
                    <div className="TheInput">
						<input disabled={props.token ? false : true} onChange={readComment} className="TextComment" placeholder={props.token ? "Escribe tu comentario..." : "ingresa para comentar..."} name="comment" value={comment.comment}/>
						<button className="buttonSend" onClick={sendComment}><i className="fas fa-paper-plane"></i></button>
				    </div>
                </div>    
            </div>
        </div>
        <Footer />
        </>
    )
}



const mapStateToProps = state => {
    return{
        product: state.productReducer.productFound, 
        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        comments: state.userReducer.comments,
        token: state.userReducer.token,
        rates: state.userReducer.rates,
        id: state.userReducer.id
    }
  }
const mapDispatchToProps = {
    dataProduct: productActions.dataProduct,
    newComment: userActions.newComment,
	getComments: userActions.getComments,
	addToCart: userActions.addToCart
}
  
  export default connect(mapStateToProps,mapDispatchToProps) (ProductFull)

