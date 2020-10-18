import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import { ToastContainer } from 'react-toastify';
import './styles/generalStyles.css';
import './styles/createProduct.css';
import './styles/CardItemList.css';
import 'react-toastify/dist/ReactToastify.css';

//Imports de pages
import Home from '../src/pages/Home';
import SignUp from '../src/pages/SignUp';
import Login from '../src/pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ShippingAddress from './components/ShippingAddress'
import BillingAddress from './components/BillingAddress'
import CreateOrder from './components/CreateOrder'
import Payment from './components/Payment'
import AdminCreateProduct from './pages/AdminCreateProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Account from './pages/Account';
import Products from './pages/Products';
import ProductFull from './pages/ProductFull';
import AdminListProduct from './pages/AdminListProduct'
import PassRecovery from './pages/PassRecovery';
import CartList from './pages/CartList';
import AdminOrders from './pages/AdminOrders';


function App(props) {
	if(localStorage.getItem('token') && props.user.token === '') {
		props.authUser(localStorage.getItem('token'))
	}
	
	if(localStorage.getItem('items') && props.user.cart.length === 0) {
		props.loadCart()
	}

	const rutas = (props.user.token === '')
	? (<Switch>
		{/* RUTAS USUARIO DESLOGUEADO */}
		<Route exact path='/' component={Home} />
		<Route exact path='/home' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
		<Route path='/products/:category' component={Products} />
		<Route path='/product/:id' component={ProductFull} />
		<Route path='/passRecovery' component={PassRecovery} />
		<Redirect to='/' />
	</Switch>)
	: (<Switch>
		{/* RUTAS USUARIO LOGUEADO  */}
		<Route exact path='/' component={Home} />
		<Route exact path='/home' component={Home} />
		<Route path='/admin' component={AdminDashboard}/>
		<Route path='/createProduct' component={AdminCreateProduct} />
		<Route path='/editProduct/:id' component={AdminEditProduct} />
		<Route path='/products/:category' component={Products} />
		<Route path='/product/:id' component={ProductFull} />
		<Route path='/account' component={Account} />
		<Route path='/shippingAddress' component={ShippingAddress}/>      
		<Route path='/billingAddress' component={BillingAddress}/>
		<Route path='/adminListProduct' component={AdminListProduct} />
		<Route path='/cartList' component={CartList}/>
		<Route path='/payment' component={Payment}/>
		<Route path='/CreateOrder' component={CreateOrder}/>
		<Route path='/orders' component={AdminOrders}/>	
 		<Redirect to='/' />
	</Switch>);
	

	return (
		<>
			<BrowserRouter>
				{rutas}	
			</BrowserRouter>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
  	);
}


const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
	authUser: userActions.authUser,
	loadCart: userActions.loadCart
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
