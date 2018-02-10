import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/RoomList.js'
import MessageList from './components/MessageList/MessageList.js'
import User from'./components/User/User.js'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyC6QH2Torq9EviDljQ5m9DKxYjP3mE_NCs",
  authDomain: "react-chatroom-database.firebaseapp.com",
  databaseURL: "https://react-chatroom-database.firebaseio.com",
  projectId: "react-chatroom-database",
  storageBucket: "react-chatroom-database.appspot.com",
  messagingSenderId: "747996608929"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //currentRoom: "-L4TJyuu_X9BeBUdfIVq"
      currentRoom: ""
    }
  }

  currentRoomCallback = (roomListCurrentRoom) => {
    //console.log("collected from RoomList Component: " + roomListCurrentRoom);
    this.setState({currentRoom: roomListCurrentRoom});
    //console.log("collected from currentRoom after change: " + this.state.currentRoom);
  };

  render() {
    return (
      <div className="App">
        <div className="navbar navbar-default navbar-fixed-left">
          <div className="nav-contents container-fluid room-section">
            <RoomList firebase={firebase} callbackCurrentRoom={this.currentRoomCallback}/> </div>
        </div>
        <div className="container-fluid">
        <User firebase={firebase}/>
          <MessageList firebase={firebase} currentRoom={this.state.currentRoom}/>
        </div>
      </div>
    );
  }
}

export default App;
