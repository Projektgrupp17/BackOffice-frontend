/**
 * Order component
 * 
 * @author Magnus Fredriksson
 * @version 0.0.1
 */
import '../OrderStyle.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {makeOrder,getAllInterests} from '../../../model/OrderModel'


/**
 * Dispatch a new update to the store with the given dispatch from 
 * the store.
 * @param {The dispatch command to sned a store upate} dispatch 
 */
const mapDispatchToProps = dispatch =>{
    return{
        makeOrder: order => dispatch(makeOrder(order)),
        getAllInterests: () => dispatch(getAllInterests())
    }
}

const mapStateToProps = state =>{
    return{
        interests: state.interests
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
        props.getAllInterests();
        this.state ={
            startDate:this.toDateString(Date.now()),
            endDate:this.toDateString(Date.now()),
            credits:100,
            video: [],
            nextVidUrl: '',
            nextVidInterest:'',
            nextVidInterestId:null
        }
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(status) {
        this.props.status(status)
    }

    validateForm() {
        return this.state.video && this.state.video.length > 0 && this.state.credits > 0 && this.state.startDate && this.state.endDate  
    }

    handleSubmit = event => {
        event.preventDefault();
        let order = {
            credits: this.state.credits, 
            user: this.props.username, 
            video: this.state.video.map(el => { 
                return {...el, interest: this.mapInterestToId([el.interest]) }}), 
            Startdate: this.toISODate(this.state.startDate), 
            Enddate: this.toISODate(this.state.endDate)
            }

        this.props.makeOrder(order);
        this.handleStatus("LOADING");
    }

    mapInterestToId(interest){
        let matches = this.props.interests.response.filter(el =>  el.string === interest[0])
        if(matches.length === 0 || matches.length > 1)
            throw new Error("INVALID INTEREST MAPPING");
        return matches[0].id;
    }

    setInterest(c){
        this.setState({
            ...this.state,
            nextVidInterest:c
        })
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
        if(!this.validateNextVideo())
            return;
        this.state.video.push({url: this.state.nextVidUrl, length: 100, interest: this.state.nextVidInterest});
        this.setState({...this.state, nextVidUrl: ""})
    }

    getVideoElements() {
        return (
        <div id="order-video-list">
        {this.state.video.map((el,ind) =>  
        <div key={el.url+ ind}>
            <input type="text" name ="video-url" value={el.url}  disabled id={"order-vid-url" + ind} key={"order-vid-url" + ind}  style={{marginRight: "1em"}}/>
            <input type="text" name ="video-interest" value={el.interest}   disabled id={"order-vid-interest-" + ind}/>
            <button onClick={() => {this.removeVideoByIndex(ind)}}>-</button>
        </div>
        )
        
        } 
        </div>
        )
    }

    removeVideoByIndex(index) {
        if(index === undefined)
            throw new Error("bad index");
        this.setState({...this.state, video: this.state.video.filter((_el, ind) => ind !== index)})
    }

    validateNextVideo() {
        let interest = this.state.nextVidInterest;
        let url = this.state.nextVidUrl;
        let match = this.state.video.filter(el => el.url === this.state.nextVidUrl && el.interest === this.state.nextVidInterest)
        //No identical duplicates.
        if (match.length > 0)
            return false
        if(interest === '-' || interest === '' || !interest || url === '-' || url === '' || !url)
            return false;
        return true;
    }

    makeInterestList(){
        return this.props.interests.response.map(interest => (
            <option value={interest.string} key={interest.id} >{interest.string}</option>
        ))
    }

    interest(){
        return(
            <select id="interest" name="Interest" onChange={e => this.setInterest(e.target.value)}>
                <option key="0" value="-">-</option>
                {this.makeInterestList()}
            </select>
        )
    }

    render() {
        return(
            <div className="orderbox" id="orderbox">
                 <form onSubmit={this.handleSubmit}>
                     <div style={{display: "flex", flexDirection:"column"}}>
                        <label className="order-label">
                            <span className="label-text">Credits:</span>
                            <input type="number"name ="name" value={this.state.credits} onChange={c => this.setCredits(c.target.value)}/>
                        </label>
                        <label className="order-label">
                            <span className="label-text">Start Date:</span>
                            <input type="date"name="start date" value={this.state.startDate} onChange={e=>this.setStartDate(e.target.value)}/>
                        </label>
                        <label className="order-label">
                            <span className="label-text">End Date:</span>
                            <input type="date"name="end date" value={this.state.endDate} onChange={e=>this.setEndDate(e.target.value)}/>
                        </label>
                        <div>
                        {this.getVideoElements()}
                        </div>
                        <br/>
                        <label className="order-label">
                            Add another video:
                        </label>
                        <div/> 
                            <input placeholder="video url" type="text"name="url" value={this.state.nextVidUrl} onChange={e=>this.setState({...this.state, nextVidUrl: e.target.value})}/>
                        <div>
                            <label>
                                Interest:
                            </label>
                            {this.interest()}
                        </div>
                        </div>
                        <div>
                        <button onClick={e=> {e.preventDefault()
                                            this.addNextVideo()}}
                                disabled={!this.validateNextVideo()}>
                        Add</button>
                        <br/>
                        </div>
                        <input type="submit" value="Create" disabled={!this.validateForm()}/>
                    </form>
            </div>
        )
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(OrderContainer)
