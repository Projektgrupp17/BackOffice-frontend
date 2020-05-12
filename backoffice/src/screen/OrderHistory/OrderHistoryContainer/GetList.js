import {connect} from 'react-redux';
import React from 'react';

const mapStateToProps = state =>{
    return{
        history: state.history
    }
}

const GetList = props =>{
    let listnr = 0;
    return (
    <table id="orderhistory-list" cellPadding="0"cellSpacing="0" border="0">
            <thead>
                <tr>
                    <th id="order">
                        Order ID
                    </th>
                    <th id ="start">
                        Start Date
                    </th>
                    <th id="end">
                        End Date
                    </th>
                </tr>
            </thead>
        <tbody id = "body">
            {
            props.history.history.map(order => 
                <tr val={order.orderId} key={listnr++} className ="tableOrder"
                 onClick={e => props.order(props.history.history.find(data => 
                 data.orderId === e.currentTarget.getAttribute("val")))}>
                    <td>{order.orderId}</td>
                    <td>{order.startDate}</td>
                    <td>{order.endDate}</td>
                </tr>)}
        </tbody>
    </table>
    )
}
//e.currentTarget.getAttribute("val")

export default connect(mapStateToProps)(GetList)

// var listing =[
//     {
//         "orderId": "001542bc-a052-4bc7-9232-b52686b3fff2",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "03ee1298-9b16-4146-b692-84b4bd413929",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "1074f88a-bc4c-45a3-9b05-f8d239cac5bf",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "10a1ed1f-1e5f-4fcd-be03-497bf1cec749",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "13636c79-8f84-4190-8fe1-fe9c4c2a164a",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "2548ad8a-2096-4aee-af2a-111e925d0791",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "2dc0e3ca-51d9-404f-9719-a67adabe2ee0",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "39ca5e0f-cf72-407c-a2e5-9673e0635dd1",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "3c125171-b4c8-4828-89af-94ba0078701b",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "46727506-958c-45ef-b4ec-ecccb8b85892",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "509efeff-f754-4962-9526-d7c76468b946",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "52a68197-3614-4367-8822-8931cd5b75a1",
//         "user": "test@example.com",
//         "credits": 46,
//         "advertisement_videos": [
//             {
//                 "id": 51,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=rhZBDNQ3gas",
//                 "lengthSec": 100
//             },
//             {
//                 "id": 52,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=5u3iv8AT8G8",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-03-29T00:00:00Z",
//         "endDate": "2020-03-29T00:00:00Z"
//     },
//     {
//         "orderId": "5578c230-e5e4-4fa3-821a-7f70f7454072",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "5caedf03-379e-4f18-8d62-584603f96f2f",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "63943e6e-d113-4ae7-9d27-3511f65b0628",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "70c80b0a-e1c6-4a50-b7a8-463fa21acaef",
//         "user": "test@example.com",
//         "credits": 10,
//         "advertisement_videos": [
//             {
//                 "id": 57,
//                 "interest": 1,
//                 "url": "URL",
//                 "lengthSec": 9999
//             }
//         ],
//         "startDate": "2020-04-17T00:03:14Z",
//         "endDate": "2020-06-17T00:03:14Z"
//     },
//     {
//         "orderId": "78a4233f-146d-47c9-8fe8-9292b94d2e04",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "7ad86427-301d-4068-96ff-37de41ad27e9",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "7e1f2a52-cd15-4c54-8732-71e51c8b23ab",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "7ef699ce-08f8-4995-9a08-192255fb72bb",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "948d9736-69e2-4e2d-8c7c-08e33c87f2e8",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "9581cde3-a9df-4b18-b3da-bbd9279cdc0c",
//         "user": "test@example.com",
//         "credits": 85,
//         "advertisement_videos": [
//             {
//                 "id": 56,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=p__q41QSlMQ",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-03-29T00:00:00Z",
//         "endDate": "2020-03-29T00:00:00Z"
//     },
//     {
//         "orderId": "9642967e-22b0-41a6-a65b-b7eddfdcd3ae",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "ab7e713b-d289-4b38-9da2-aac147da3258",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [
//             {
//                 "id": 59,
//                 "interest": 21,
//                 "url": "sdasdsa",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-04-11T00:00:00Z",
//         "endDate": "2020-04-11T00:00:00Z"
//     },
//     {
//         "orderId": "bce5984a-0a61-418f-80a5-5c3a84aed35d",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [
//             {
//                 "id": 62,
//                 "interest": 21,
//                 "url": "sdasdsa",
//                 "lengthSec": 100
//             },
//             {
//                 "id": 63,
//                 "interest": 11,
//                 "url": "saddsa",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-04-11T00:00:00Z",
//         "endDate": "2020-04-11T00:00:00Z"
//     },
//     {
//         "orderId": "c6a06096-3948-456a-9a1c-96bccefda23a",
//         "user": "test@example.com",
//         "credits": 79,
//         "advertisement_videos": [
//             {
//                 "id": 50,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=AfJ7LQn8kp8",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-03-29T00:00:00Z",
//         "endDate": "2020-03-29T00:00:00Z"
//     },
//     {
//         "orderId": "d15315e3-df78-407a-a172-c7414926ddeb",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "d5863d64-caa9-4290-aa56-a632c0b41e6a",
//         "user": "test@example.com",
//         "credits": 58,
//         "advertisement_videos": [
//             {
//                 "id": 48,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=YVfzWpmyXXk",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-03-29T00:00:00Z",
//         "endDate": "2020-03-29T00:00:00Z"
//     },
//     {
//         "orderId": "d9ebda6f-8408-420c-85db-cb6f8f1c0c3f",
//         "user": "test@example.com",
//         "credits": 70,
//         "advertisement_videos": [
//             {
//                 "id": 49,
//                 "interest": 1,
//                 "url": "https://www.youtube.com/watch?v=g0WmiI2QUw0",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-03-29T00:00:00Z",
//         "endDate": "2020-03-29T00:00:00Z"
//     },
//     {
//         "orderId": "dfab4838-77d2-4740-a36d-0bdbafd9cdd7",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "edd7d6ba-1e2c-4d10-b708-4074a6bdf1a5",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "ee19304d-cbd9-4944-ac2e-4343d2585496",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [
//             {
//                 "id": 60,
//                 "interest": 21,
//                 "url": "sdasdsa",
//                 "lengthSec": 100
//             },
//             {
//                 "id": 61,
//                 "interest": 11,
//                 "url": "saddsa",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-04-11T00:00:00Z",
//         "endDate": "2020-04-11T00:00:00Z"
//     },
//     {
//         "orderId": "efceacad-ffd2-4df2-9092-65cb50e47634",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [
//             {
//                 "id": 64,
//                 "interest": 21,
//                 "url": "1232",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-04-11T00:00:00Z",
//         "endDate": "2020-04-11T00:00:00Z"
//     },
//     {
//         "orderId": "f10da3e5-3fda-40e8-ba6b-b0a03f3dd3fa",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "f13f95e0-2d50-4b01-b4be-a75261295a84",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     },
//     {
//         "orderId": "f9ba8e3b-dff4-4f19-8ea3-c83b9481d672",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [
//             {
//                 "id": 58,
//                 "interest": 21,
//                 "url": "dasdadsa",
//                 "lengthSec": 100
//             }
//         ],
//         "startDate": "2020-04-11T00:00:00Z",
//         "endDate": "2020-04-11T00:00:00Z"
//     },
//     {
//         "orderId": "fd35e455-42e5-45d7-9c25-799c2dcd7cdb",
//         "user": "test@example.com",
//         "credits": 100,
//         "advertisement_videos": [],
//         "startDate": "",
//         "endDate": ""
//     }
// ]