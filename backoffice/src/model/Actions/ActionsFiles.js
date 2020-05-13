/**
 * This file contains all the actions to be used by the redux login model.
 * @author Netanel Avraham Eklind
 * @author Magnus
 * 
 * @version 1.0.0
 */

 export const saveOrder = (order,orderId) =>({
     type:'SAVE_ORDER',
     payload: {order,orderId}
 })

 export const postUserLoginRequest =() => ({
     type:'POST_USER_LOGIN_REQUEST',
 })

 export const postUserLoginSuccess = auth =>({
     type: 'POST_USER_LOGIN_SUCCESS',
     payload:auth
 })

 export const postUserLoginError = error =>({
     type: 'POST_USER_LOGIN_ERROR',
     payload:error
 })

 export const postUserLogout = auth =>({
     type: 'POST_USER_LOGOUT',
     payload:auth
 })

 export const postUserLougoutRequest = () =>({
     type:'POST_USER_LOGOUT_REQUEST'
 })

 export const postUserRegisterRequest = () =>({
     type:'POST_USER_REGISTER_REQUEST'
 })

 export const postUserRegisterSuccess = (status) =>({
    type:'POST_USER_REGISTER_SUCCESS',
    payload:status
})

export const postUserRegisterError = (error) =>({
    type:'POST_USER_REGISTER_ERROR',
    payload:error
})

export const postOrderRequest =() => ({
    type:'POST_ADVERTISEMENT_ORDER',
})

export const postOrderSuccess = auth =>({
    type: 'POST_ADVERTISEMENT_ORDER_SUCCESS',
    payload:auth
})

export const postOrderError = error =>({
    type: 'POST_ADVERTISEMENT_ORDER_ERROR',
    payload:error
})


export const refreshOrder = auth =>({
    type:'REFRESH_USER_LOGIN',
    payload: auth
})


export const getInterestsRequest = () =>({
    type:'GET_INTEREST_REQUEST'
})
export const getInterestsSuccess = data =>({
    type: 'GET_INTEREST_SUCCESS',
    payload: data
})
export const getInterestsError = error =>({
    type: 'GET_INTEREST_ERROR',
    error: error
})

export const getUserRequest = () =>({
    type:'GET_USER_REQUEST'
})
export const getUserSuccess = data =>({
    type: 'GET_USER_SUCCESS',
    payload: data
})
export const getUserError = error =>({
    type: 'GET_USER_ERROR',
    error: error
})


export const getOrderhistoryRequest = () =>({
    type:'GET_ORDERHISTORY_REQUEST'
})
export const getOrderhistorySuccess = data =>({
    type: 'GET_ORDERHISTORY_SUCCESS',
    payload: data
})
export const getOrderhistoryError = error =>({
    type: 'GET_ORDERHISTORY_ERROR',
    error: error
})
export const updateUserRequest = () =>({
    type:'UPDATE_USER_REQUEST'
})
export const updateUserSuccess = data =>({
    type: 'UPDATE_USER_SUCCESS',
    payload: data
})
export const updateUserError = error =>({
    type: 'UPDATE_USER_ERROR',
    error: error
})
