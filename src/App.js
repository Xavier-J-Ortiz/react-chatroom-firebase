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
      currentRoom: "",
      currentUser: null,
      currentRoomName: ""
    }
  }

  currentRoomCallback = (roomListCurrentRoom, roomListCurrentRoomName) => {
    this.setState({
      currentRoom: roomListCurrentRoom,
      currentRoomName: roomListCurrentRoomName
    });
  };

  currentUserCallback = (userCurrentUser) => {
    this.setState({ currentUser: userCurrentUser });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 navbar navbar-default navbar-fixed-left">
            <div className="nav-contents room-section fixed-top col-md-2">
              <div className="row">
                <RoomList firebase={firebase} callbackCurrentRoom={this.currentRoomCallback}/> </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <User currentUserCallback={ this.currentUserCallback } firebase={firebase} currentUser={ this.state.currentUser }/>
          <MessageList firebase={firebase} currentRoomName={ this.state.currentRoomName } currentRoom={this.state.currentRoom} currentUser={ this.state.currentUser }/>
        </div>
      </div>
    );
  }
}

export default App;
