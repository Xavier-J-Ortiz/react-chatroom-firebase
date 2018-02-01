import React, { Component } from 'react';
import logo from './logo.svg';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RoomList
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
