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

export {postUserLoginError,postUserLoginRequest,postUserLoginSuccess,postUserRegisterRequest,postUserRegisterError,postUserRegisterSuccess} ;