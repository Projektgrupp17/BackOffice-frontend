/**
 * This file contains all the actions to be used by the redux login model.
 * @author Netanel Avraham Eklind
 * @author Magnus
 * 
 * @version 1.0.0
 */

/*ALL THE BELOW A */
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

 const postUserLogout = auth =>({
     type: 'POST_USER_LOGOUT',
     payload:auth
 })

 const postUserRegisterRequest = () =>({
     type:'POST_USER_REGISTER_REQUEST'
 })

 const postUserRegisterSuccess = (status) =>({
    type:'POST_USER_REGISTER_SUCCESS',
    payload:status
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

const getInterestsRequest = () =>({
    type:'GET_INTEREST_REQUEST'
})
const getInterestsSuccess = data =>({
    type: 'GET_INTEREST_SUCCESS',
    payload: data
})
const getInterestsError = error =>({
    type: 'GET_INTEREST_ERROR',
    error: error
})


const getOrderhistoryRequest = () =>({
    type:'GET_ORDERHISTORY_REQUEST'
})
const getOrderhistorySuccess = data =>({
    type: 'GET_ORDERHISTORY_SUCCESS',
    payload: data
})
const getOrderhistoryError = error =>({
    type: 'GET_ORDERHISTORY_ERROR',
    error: error
})



export {postUserLoginError,postUserLoginRequest,postUserLoginSuccess, postOrderRequest, postOrderSuccess, postOrderError,
postUserRegisterRequest,postUserRegisterSuccess,postUserRegisterError,refreshOrder,postUserLogout,getInterestsRequest,
getInterestsSuccess,getInterestsError,getOrderhistoryRequest,getOrderhistorySuccess,getOrderhistoryError};
