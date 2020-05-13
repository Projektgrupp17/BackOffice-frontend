/**
 * Login UnitTest: done
 */

import Order, { makeOrder, getAllInterests, orderHistory } from '../model/OrderModel';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import { ENDPOINTBACKEND } from '../config/config';
const chai = require('chai');


it("Ordermodel", () => {
    chai.expect(Order).to.not.equal(null)
})

const middleware = [thunk];

const mockStore = configureStore(middleware);

const mock = new MockAdapter(axios);
const store = mockStore({});

describe("Order actions", () => {
    beforeEach(() => {
        store.clearActions()
        mock.resetHistory();
    })

    it('Should get success response', () => {
        let expectedActions = [
            {
                type: 'POST_ADVERTISEMENT_ORDER'
            },
            {
                type: "SAVE_ORDER",
                payload: {
                    order:{
                        user: "test@example.com",
                        credits: 100, "video": [{
                            "url": "1232", "length": 100,
                            interest: "dance"
                        }],
                        Startdate: "2020-04-11T00:00:00.000Z",
                        Enddate: "2020-04-11T00:00:00.000Z"
                    },
                    orderId:"efceacad-ffd2-4df2-9092-65cb50e47634"
                }
            },
            {
                type: "POST_ADVERTISEMENT_ORDER_SUCCESS",
                payload: "efceacad-ffd2-4df2-9092-65cb50e47634"
            }
        ]

        mock.onPost(ENDPOINTBACKEND + 'order/add', {
            user: "test@example.com",
            credits: 100, "video": [{
                "url": "1232", "length": 100,
                interest: "dance"
            }],
            Startdate: "2020-04-11T00:00:00.000Z",
            Enddate: "2020-04-11T00:00:00.000Z"
        }).replyOnce(201,
            "efceacad-ffd2-4df2-9092-65cb50e47634"
        );

        return store.dispatch(makeOrder({
            user: "test@example.com",
            credits: 100, "video": [{
                "url": "1232", "length": 100,
                interest: "dance"
            }],
            Startdate: "2020-04-11T00:00:00.000Z",
            Enddate: "2020-04-11T00:00:00.000Z"
        }))
            .then(() => {
                let mockStore = {
                    auth: {
                        token: store.getActions()[1].payload.token,
                        refreshtoken: store.getActions()[1].payload.refreshtoken
                    }
                }
                store.getState = () => mockStore
                chai.expect(store.getActions()).to.deep.equal(expectedActions);
            })
    })

    it('Should handle error response', () => {
        let expectedActions = [
            {
                type: 'POST_ADVERTISEMENT_ORDER'
            },
            {
                type: "POST_ADVERTISEMENT_ORDER_ERROR",
                payload: "Request failed with status code 500"
            }
        ]

        mock.onPost(ENDPOINTBACKEND + 'order/add', {
            user: "test@example.com",
            credits: 100, "video": [{
                "url": "1232", "length": 100,
                interest: "dance"
            }],
            Startdate: "2020-04-11T00:00:00.000Z",
            Enddate: "2020-04-11T00:00:00.000Z"
        })
            .replyOnce(500, "internal server error");

        return store.dispatch(makeOrder({
            user: "test@example.com",
            credits: 100, "video": [{
                "url": "1232", "length": 100,
                interest: "dance"
            }],
            Startdate: "2020-04-11T00:00:00.000Z",
            Enddate: "2020-04-11T00:00:00.000Z"
        }))
            .then(() => {
                let mockStore = {
                    auth: {
                        token: store.getActions()[1].payload.token,
                        refreshtoken: store.getActions()[1].payload.refreshtoken
                    }
                }
                store.getState = () => mockStore
                chai.expect(store.getActions()).to.deep.equal(expectedActions);
            })
    })

    it('dispatches interst actions', () => {
        let expectedActions = [
            {
                type: 'GET_INTEREST_REQUEST'
            },
            {
                type: "GET_INTEREST_SUCCESS",
                payload: [{ id: 21, string: "dance" }]
            }
        ]
        mock.onGet(ENDPOINTBACKEND + 'order/intrests')
            .replyOnce(200, [{
                id: 21,
                string: "dance"
            }]);

        return store.dispatch(getAllInterests())
            .then(() => {
                store.getState = () => mockState;
                chai.expect(store.getActions()).to.deep.equal(expectedActions);
            })
    })

    it('handle errors on get interest', () => {
        let expectedActions = [
            {
                type: 'GET_INTEREST_REQUEST'
            },
            {
                type: "GET_INTEREST_ERROR",
                error: "Request failed with status code 500"
            }
        ]
        mock.onGet(ENDPOINTBACKEND + 'order/intrests')
            .replyOnce(500);

        return store.dispatch(getAllInterests())
            .then(() => {
                store.getState = () => mockState;
                chai.expect(store.getActions()).to.deep.equal(expectedActions);
            })
    })
})

describe("Orderhistory works correctly",() =>{
    beforeEach(() => {
        store.clearActions()
        mock.resetHistory();
    })

    it('Right actions are sent', () =>{
        let expectedActions = [
            {type:'GET_ORDERHISTORY_REQUEST'},
            {type:'GET_ORDERHISTORY_SUCCESS',
             payload:{
                orderId: "196186bd-6a96-4146-9875-f493ede746f7",
                user: "gman@gman.com",
                credits: 97,
                advertisement_videos: [
                    {
                        video: {
                            id: 96,
                            interest: 31,
                            url: "https://www.youtube.com/watch?v=Ivp54NwaA4c",
                            lengthSec: 100
                        },
                        played: true,
                        count: 1
                    }
                ],
                startDate: "2020-04-13T00:00:00Z",
                endDate: "2020-04-13T00:00:00Z"
            }
            }
        ]

        let testUser = 'gman@gman.com'

        mock.onGet(`${ENDPOINTBACKEND}order/history?userName=${testUser}`)
        .replyOnce(200,{orderId: "196186bd-6a96-4146-9875-f493ede746f7",
        user: "gman@gman.com",
        credits: 97,
        advertisement_videos: [
            {
                video: {
                    id: 96,
                    interest: 31,
                    url: "https://www.youtube.com/watch?v=Ivp54NwaA4c",
                    lengthSec: 100
                },
                played: true,
                count: 1
            }
        ],
        startDate: "2020-04-13T00:00:00Z",
        endDate: "2020-04-13T00:00:00Z"
    });

    return store.dispatch(orderHistory(testUser))
    .then(()=>{
        chai.expect(store.getActions()).to.deep.equal(expectedActions);
    })

    })

    it('Error if no user is found', ()=>{
        let testuser = 'hello@hello.g'
        let expectedActions =[
            {type:'GET_ORDERHISTORY_REQUEST'},
            {type:'GET_ORDERHISTORY_ERROR',
             error:`Request failed with status code 404`}
        ]

        mock.onGet(`${ENDPOINTBACKEND}order/history?userName=${testuser}`)
        .replyOnce(404)

        return store.dispatch(orderHistory(testuser))
        .then(() =>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
})