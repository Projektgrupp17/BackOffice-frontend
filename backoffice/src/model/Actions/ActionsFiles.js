/**
 * This file contains all the actions to be used by the redux login model.
 * @author Netanel Avraham Eklind
 * @author Magnus
 * 
 * @version 1.0.0
 */


 const postUserLoginRequest =() => ({
     type:'POST_USER_LOGIN_REQUEST',
 })

 const postUserLoginSuccess = auth =>({
     type: 'POST_USER_LOGIN_SUCCESS',
     payload:auth
 })

 const postUserLoginError = error =>({
     type: 'POST_USER_LOGIN_ERROR',
     payload:error
 })

 const postUserRegisterRequest = () =>({
     type:'POST_USER_REGISTER_REQUEST'
 })

 const postUserRegisterSuccess = (auth) =>({
    type:'POST_USER_REGISTER_SUCCESS',
    payload:auth
})

const postUserRegisterError = (error) =>({
    type:'POST_USER_REGISTER_ERROR',
    payload:error
})

const postOrderRequest =() => ({
    type:'POST_ADVERTISEMENT_ORDER',
})

const postOrderSuccess = auth =>({
    type: 'POST_ADVERTISEMENT_ORDER_SUCCESS',
    payload:auth
})

const postOrderError = error =>({
    type: 'POST_ADVERTISEMENT_ORDER_ERROR',
    payload:error
})


const refreshOrder = auth =>({
    type:'REFRESH_USER_LOGIN',
    payload: auth
})



export {postUserLoginError,postUserLoginRequest,postUserLoginSuccess, postOrderRequest, postOrderSuccess, postOrderError,
postUserRegisterRequest,postUserRegisterSuccess,postUserRegisterError,refreshOrder} ;
