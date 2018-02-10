import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {

  constructor(props) {
    super(props);
    this.newRoomRef = ''
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ 
        rooms: this.state.rooms.concat( room ),
        new_room: '',
        currentRoom: ''
      });
    });
  }

  createNewRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.newRoomRef });
  }

  detectChange(e) {
    this.newRoomRef = e.target.value;
    this.setState( { new_room: this.newRoomRef } );
  }

  clickRoom(roomName) {
    this.setState({ currentRoom: roomName });
    this.props.callbackCurrentRoom(roomName);

  }

  render() {
    return (
      <div className="nav-contents">
        <div className="navbar-header">
          <a className="navbar-brand"> Chat Rooms </a>
        </div>
        <ul className="navbar-nav nav">
          { this.state.rooms.map( (val, index) => <li className="room-li" key={index} onClick={() => this.clickRoom(val.key)}> {val.name} </li> ) }
        </ul>
        <form onSubmit={ (e) => this.createNewRoom(e) }>
          <input type="text" className="submit-text" value={ this.state.new_room || "" } onChange={ (e) => this.detectChange(e) } />
          <input type="submit" className="submit-button" value="Create New Room" />
        </form>
      </div>
    )
  }
}

export default RoomList;
