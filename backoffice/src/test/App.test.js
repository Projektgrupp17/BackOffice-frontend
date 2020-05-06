import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Login from '../screen/LoginView/Login';
import loginModel, { login } from '../model/LoginModel';

const chai = require('chai')



//Test intitial start screen!
it('Renders without crashing', () =>{
    const div = document.createElement("div");
    ReactDOM.render(<Login model={loginModel}/>,div);
    ReactDOM.unmountComponentAtNode(div);
});
