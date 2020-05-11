/**
 * Userservice component
 * 
 * @author Magnus Fredriksson
 * @version 0.0.1
 */
//import '../OrderStyle.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentUser, putUserUpdate} from '../../../model/LoginModel'
import equal from 'deep-equal';


/**
 * Dispatch a new update to the store with the given dispatch from 
 * the store.
 * @param {The dispatch command to sned a store upate} dispatch 
 */
const mapStateToProps = state => ({ 
    userInfo: state.userInfo,
    userUpdate: state.userUpdate
})

const mapDispatchToProps = dispatch => {
    return {
      updateUser: updatedUser => dispatch(putUserUpdate(updatedUser)),
      getCurrentUser: email => dispatch(getCurrentUser(email)),
    }
}



/**
 * The main component of the loginbox.
 * It handles the submition of the email and password and sends it to the store
 * for login.
 */
class UserServiceBox extends Component {
    constructor(props){
        super(props)
        this.state ={
            startDate:this.toDateString(Date.now()),
            endDate:this.toDateString(Date.now()),
            newUser: {
                username: '',
                email: '',
                agency: ''
            },
            newPassword: '',
            newPasswordRepeat: '',
            oldPasswordConfirm: ''
        }
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(status) {
        this.props.status(status)
    }

    validateForm() {
        return this.state.video && this.state.video.length > 0 && this.state.credits > 0 && this.state.startDate && this.state.endDate  
    }

    componentDidMount() {
        this.props.getCurrentUser(this.props.userEmail);
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.userInfo.user, prevProps.userInfo.user))
            this.setState({...this.state, newUser: this.props.userInfo.user}); 
    }

    handleSubmit = event => {
        event.preventDefault();
        let updatedUser = {
            ...this.state.newUser,
            oldEmail: this.props.userInfo.user.email,
            oldPassword: this.state.oldPasswordConfirm,
            password: this.state.newPassword
        }
        this.props.updateUser(updatedUser);
        this.handleStatus("LOADING");
    }

    toDateString(dateEpoch) {
        let date = new Date(dateEpoch);
        let year = date.getYear()+1900;
        let month = ("0" + date.getMonth()).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }

    MessageDisplay = () => {
    if(this.props.userUpdate.error)
        return (<span className="error-display">{this.props.userUpdate.error}</span>)
    if(this.props.userUpdate.message) 
        return (<span className="error-display success">{this.props.userUpdate.message.message}</span>)
    return <span/>
    }
    
    setNewUserData(key, val){
        this.setState({
            ...this.state,
            newUser: {...this.state.newUser, [key]: val}
        })
    }

    validateForm() {
        let s = this.state;
        let u = this.state.newUser;
        return s.newPassword !== '' 
            && s.newPassword === s.newPasswordRepeat
            && s.oldPasswordConfirm != '' 
            && u.email != ''
            && u.password != ''
            && u.agency != ''
            && u.username != '';
     }

    render() {
        return(
            <div className="orderbox" id="orderbox">
                <b style={{textAlign: "center"}}>Change your user info</b>
                <br/><br/>
                    <div style={{display: "flex", flexDirection:"column"}}>
                    <label className="order-label">
                            <b className="label-text long">Email:</b>
                            <input type="text"name ="email" value={this.state.newUser.email} disabled={true} onChange={c => {this.setNewUserData("email", c.target.value)}}/>
                    </label>
                    <label className="order-label">
                            <b className="label-text long">Username:</b>
                            <input type="text"name ="email" value={this.state.newUser.username} onChange={c => {this.setNewUserData("username", c.target.value)}}/>
                    </label>
                    <label className="order-label">
                            <b className="label-text long">Agency:</b>
                            <input type="text" name ="Agency" value={this.state.newUser.agency}  onChange={c => {this.setNewUserData("agency", c.target.value)}}/>
                    </label>
                    <label className="order-label">
                            <b className="label-text long">New password:</b>
                            <input type="password" name ="Password" value={this.state.newPassword} placeholder="******" onChange={c => {this.setState({...this.state, newPassword: c.target.value})}}/>
                    </label>
                    <label className="order-label">
                            <b className="label-text long">Repeat new password:</b>
                            <input type="password" name ="Password" value={this.state.newPasswordRepeat} placeholder="******"  onChange={c => {this.setState({...this.state, newPasswordRepeat: c.target.value})}}/>
                    </label>
                    </div>
                    <label className="order-label">
                            <b className="label-text long">Old password:</b>
                            <input type="password" name ="Old password" value={this.state.oldPasswordConfirm} placeholder="******" onChange={c => {this.setState({...this.state, oldPasswordConfirm: c.target.value})}}/>
                    </label>
                    <button className="submit small" disabled={!this.validateForm()} onClick={this.handleSubmit}>Update</button>
                    <this.MessageDisplay/>
            </div>
        )
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(UserServiceBox)