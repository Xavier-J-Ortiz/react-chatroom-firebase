import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/RoomList.js'
import * as firebase from 'firebase';

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
  render() {
    return (
      <div className="App">
        <div className="navbar navbar-default navbar-fixed-left">
          <div className="container">
            <div className="navbar-header">
              <p>Chat Rooms</p>
            </div>
          </div>
          <div>
            <RoomList firebase={firebase} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
