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
        rooms: this.state.rooms.concat( room )
      });
    });
  }

  render() {
    console.log(this.state.rooms.map( (value) => value.name ));
    let formatted =  this.state.rooms.map( (value) => <li> {value.name} </li> ); 
    return (
      <div className="navbar">
        <ul className="navbar nav">
          {formatted}
        </ul>
      </div>

    )
  }
}

export default RoomList;
