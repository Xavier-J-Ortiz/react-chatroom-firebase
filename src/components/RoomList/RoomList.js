import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
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
    this.setState( { new_room: e.target.value } );
    this.newRoomRef = this.state.new_room;
  }

  clickRoom(roomName) {
    this.setState({ currentRoom: roomName });
    this.props.callbackCurrentRoom(roomName);
  }

  render() {
    return (
      <div className="navbar">
        <ul className="navbar nav">
          { this.state.rooms.map( (val, index) => <li key={index} onClick={() => this.clickRoom(val.key)}> {val.name} </li> ) }
        </ul>
        <form onSubmit={ (e) => this.createNewRoom(e) }>
          <input type="text" value={ this.state.new_room || "" } onChange={ (e) => this.detectChange(e) } />
          <input type="submit" value="Create New Room" />
        </form>
      </div>
    )
  }
}

export default RoomList;
