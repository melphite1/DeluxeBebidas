const express = require("express")
const userController = require("../controllers/userController")
const commentController = require("../controllers/commentController")
const productController = require ("../controllers/productController")
const validator = require("../config/validator")
const passport = require("../config/passport")
const orderController = require("../controllers/orderController")
const router = express.Router()

//ADMIN ROUTES
router.route("/user/admin")
.get(userController.getDataAdmin)

// USER ROUTES
router.route("/user/register")
.post(/*validator.validateUser,*/userController.createUser)

router.route("/user/modifyUser")
.put(passport.authenticate('jwt',{session: false}),userController.editUser)

router.route("/user/getInfoUser")
.get(passport.authenticate('jwt',{session: false}), userController.userInfo)

router.route("/user/login")
.get(passport.authenticate('jwt',{session: false}), userController.decodeUser)
.post(userController.loginUser)

router.route("/user/addWishList")
.put(passport.authenticate('jwt',{session: false}), userController.addToWishlist)

router.route("/user/removeWishList/:id")
.delete(passport.authenticate('jwt',{session: false}), userController.removeToWishlist)

router.route("/user/addShippingAddress")
.put(passport.authenticate('jwt',{session: false}),userController.addShippingAddress)

router.route("/user/addBillingAddress")
.put(passport.authenticate('jwt',{session: false}), userController.addBillingAddress)

router.route("/user/rate")
.patch(passport.authenticate('jwt',{session: false}), userController.setRate)

router.route("/user/rate/r")
.patch(passport.authenticate('jwt',{session: false}), userController.delRate)


// PRODUCTS ROUTES
router.route("/product/createProduct")
.post( productController.createProduct)


router.route("/product/getProduct/:id")
.get(productController.getProductById)


router.route("/product/editProduct/:id")
.put( productController.modifyProduct)


router.route("/product/deleteProduct/:id")
.delete(productController.deleteProduct)


router.route("/product/listProducts")
.get(productController.getAllProducts)


router.route("/product/wishList")
.get(productController.getProductByWishlist)


router.route("/products/:category")
.get(productController.getProductByCat)

router.route("/rateProd/:id")
.post(productController.instaRate)


// ORDER ROUTES
router.route("/orders")
.get(orderController.getAllOrders)
.post(passport.authenticate('jwt', {session: false}), orderController.createOrder)
// .put(passport.authenticate('jwt', {session: false}), orderController.modifyOrder)

router.route("/orders/:id")
.get(orderController.getOrderById)
.put(orderController.deleteOrder)


router.route("/order/user")
.get(passport.authenticate('jwt', {session: false}), orderController.getUserOrder)





// COMNENTS ROUTES

router.route("/comment/:productId")
.get(commentController.getProductComments)

router.route("/comment")
.post(commentController.postComment)
.put(commentController.modifyCommentById)

router.route("/comment/:id")
.delete(commentController.deleteCommentById)

// PASSWORD RECOVERY
router.route('/sendMail')
.put(userController.NewPass)





module.exports = router;
