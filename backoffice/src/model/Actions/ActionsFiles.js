/**
 * This file contains all the actions to be used by the redux login model.
 * 
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


export {postUserLoginError,postUserLoginRequest,postUserLoginSuccess, postOrderRequest, postOrderSuccess, postOrderError} ;