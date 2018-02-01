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
        new_room: ''
      });
    });
  }

  createNewRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.newRoomRef });
  }

  detectChange(e) {
    this.setState( { new_room: e.target.value } );
    //console.log(this.state.new_room);
    
    this.newRoomRef = this.state.new_room;
  }

  render() {
    //console.log(this.state.rooms.map( (value) => value.name ));
    let formatted =  this.state.rooms.map( (value, index) => <li key={index}> {value.name} </li> ); 
    return (
      <div className="navbar">
        <ul className="navbar nav">
          {formatted}
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
