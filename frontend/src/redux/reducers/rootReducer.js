import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
	orderReducer,
	productReducer,
	userReducer
})

export default rootReducer;