/**
 * Order component
 * 
 * @author Magnus Fredriksson
 * @version 0.0.1
 */
import '../OrderStyle.css'
<<<<<<< HEAD
import React,{Component} from 'react'
=======
import React,{ Component} from 'react'
>>>>>>> 1685de278757d429afb4ddb21f672c0223e12810
import {connect} from 'react-redux'
import {makeOrder} from '../../../model/OrderModel'


/**
 * Dispatch a new update to the store with the given dispatch from 
 * the store.
 * @param {The dispatch command to sned a store upate} dispatch 
 */
const mapDispatchToProps = dispatch =>{
    return{
        makeOrder: order => dispatch(makeOrder(order))
    }
}


/**
 * The main component of the loginbox.
 * It handles the submition of the email and password and sends it to the store
 * for login.
 */
class OrderContainer extends Component {
    constructor(props){
        super(props)
        this.interestMap = {
            Sports: "1",
            Movies: "11"
        }
        this.state ={
            startDate:this.toDateString(Date.now()),
            endDate:this.toDateString(Date.now()),
            credits:100,
            video: [],
            nextVidUrl: '',
            nextVidInterest: 'Sports'
        }
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(status) {
        this.props.status(status)
    }

   validateForm() {
    return true;    
        //return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.makeOrder({
            credits: this.state.credits, 
            user: this.props.username, 
            video: this.state.video.map(el => { return {...el, interest: this.interestMap[el.interest] } }), 
            Startdate: this.toISODate(this.state.startDate), 
            Enddate: this.toISODate(this.state.endDate)
            })
        this.handleStatus("LOADING");
    }

    setCredits(c) {
        this.setState({
            ...this.state,
            credits:c
        })
    }

    setStartDate(c) {
        this.setState({
            ...this.state,
            startDate:c
        })
    }

    setEndDate(c) {
        this.setState({
            ...this.state,
            endDate:c
        })
    }

    toDateString(dateEpoch) {
        let date = new Date(dateEpoch);
        let year = date.getYear()+1900;
        let month = ("0" + date.getMonth()).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }

    toISODate(dateString) {
       return new Date(dateString).toISOString();
    }
    
    addNextVideo() {
        this.state.video.push({url: this.state.nextVidUrl, length: 100, interest: this.state.nextVidInterest});
        this.setState({...this.state, nextVidUrl: ""})
    }

    getVideoElements() {
        return (
        <div id="order-video-list">
        {this.state.video.map((el,ind) =>  
        <div>
            <input type="text"name ="video-url" value={el.url}  disabled id={"order-vid-url" + ind}/>
            <input type="text"name ="video-url" value={el.interest}  disabled id={"order-vid-interest-" + ind}/>
        </div>
        )
        
        } 
        </div>
        )
    }

    render() {
        return(
            <div className="orderbox" id="orderbox">
                 <form onSubmit={this.handleSubmit}>
                        <label>
                            Credits:
                            <input type="number"name ="name" value={this.state.credits} onChange={c => this.setCredits(c.target.value)}/>
                        </label>
                        <label>
                            Start Date:
                            <input type="date"name="start date" value={this.state.startDate} onChange={e=>this.setStartDate(e.target.value)}/>
                        </label>
                        <label>
                            End Date:
                            <input type="date"name="end date" value={this.state.endDate} onChange={e=>this.setEndDate(e.target.value)}/>
                        </label>
                        <div>
                        {this.getVideoElements()}
                        </div>
                        <label>
                            Add another video:
                        <div/> 
                            <input placeholder="video url" type="text"name="url" value={this.state.nextVidUrl} onChange={e=>this.setState({...this.state, nextVidUrl: e.target.value})}/>
                        </label>
                        <div>
                        <button onClick={e=> {e.preventDefault()
                                            this.addNextVideo()}}>
                        Add</button>
                        <br/>
                        </div>
                        <input type="submit" value="Create" disabled={!this.validateForm()}/>
                    </form>
            </div>
        )
    }
}
 
export default connect(null,mapDispatchToProps)(OrderContainer)
