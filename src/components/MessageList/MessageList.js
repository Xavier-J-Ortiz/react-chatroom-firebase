import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageRef = this.props.firebase.database().ref('messages');
    this.state = {
      messages: [],
      currentRoom: this.props.currentRoom
    };
  }

  componentDidMount() {
    var query = this.messageRef.orderByChild('roomId').equalTo(this.state.currentRoom);
    query.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message),
        new_message: '',
        query: query
      })
    });
  }

  componentWillReceiveProps(nextProp) {
    this.setState({ 
      currentRoom: nextProp.currentRoom,
      messages: []
    });
    this.state.query.off('child_added');

    var query = this.messageRef.orderByChild('roomId').equalTo(nextProp.currentRoom);
    query.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message),
        new_message: '',
        query: query
      })
    });

    this.messageRef.orderByChild('roomId').equalTo(this.state.currentRoom).on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message),
        new_message: ''
      })
    });

  }

  render() {
    //console.log(this.state.currentRoom);
    //console.log(this.state.messages.map( (value, index) => "index: " + index + " message: " + value.content ));
    let formatted = this.state.messages.map( (value, index) => <li key={index}> {value.name}  :  {value.content} </li>)
    return (
      <ul>
        {formatted}
      </ul>
    )
  }

}

export default MessageList;
