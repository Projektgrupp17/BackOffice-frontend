import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Login from '../screen/LoginView/Login';
import {MemoryRouter} from 'react-router';
import loginModel from '../model/LoginModel';
import Button from '../Button';

//Test intitial start screen!
it('Renders without crashing', () =>{
    const div = document.createElement("div");
    ReactDOM.render(<Login model={loginModel}/>,div);
    ReactDOM.unmountComponentAtNode(div);
});


it("renders and is working", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<Button label={test}/>,div)
    ReactDOM.unmountComponentAtNode(div);

})

//Checks path is correct
it('redirects to the correct screen on first render', () => {
    const root = document.createElement("div");
    document.body.appendChild(root);

    render(
        <MemoryRouter initialEntries = {['/']}>
            <Login model={loginModel}/>
        </MemoryRouter>,
        root
    );
})
