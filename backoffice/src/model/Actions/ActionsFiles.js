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

export {postUserLoginError,postUserLoginRequest,postUserLoginSuccess} ;