/**
 * This file handles the JWT decoding so the user can send this information back and forth when needed!
 */

import Axios from 'axios';
import instanceModel from './LoginModel';




const jwt = require('jsonwebtoken');
const RSAKey = require('rsa-key');


const pkey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp9zDetMqlfV9XMBVUmgJDPiEpW6DrQFXnv1dtU4DeN754eTr3FQImV8mXl49OXXLy3nkUa/qgllM2vhqrPWpZd0BuUAafl1ju9ik/mqmUfRqYf5g0GqD++Jr7JvSBp7Y34o0tZNn81m+lkGU8qWx27U3a/FwTniGn1kzfZoKkBIjVHCLHM87lMnQEOEBm8o6DPzX0Oc1OFkqZhRZiqMPa4Nz96ftd1Lg/2Q7ut8elpASXDY1dLjm9dilTERjg0MjrunOMvgGCj2Zzsu56QoZ02tS1lGj2XkcKhc4WMVknid/s3FPOHmHvyoZsw7REGzVDpKTS6ENJ06UtXYtK0wJqwIDAQAB";

const JWTverify = (token) =>{
    try {
        let key = new RSAKey(pkey);
        jwt.verify(token,key.exportKey(),{algorithms:["RS256"]})
       return true
   } catch (error) {
       console.log(error.message)
       return false;
   }
}
const setAutherizationToken = (token) => {
    if(token){
        Axios.defaults.headers.common['authorization'] = `${token}`
    }
    else{
        delete Axios.defaults.headers.common['authorization']
    }
}

const isAuth = () =>{
    console.log(instanceModel.store.getState().loginUser.auth.token )
    if(instanceModel.store.getState().loginUser.auth.token !== ''){
        return true
    }
    else{
        return false;
    }
}
 


 export {JWTverify,setAutherizationToken,isAuth};