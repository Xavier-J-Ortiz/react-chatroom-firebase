import React, { Component } from 'react';
import './MessageList.css';
import MessageUpdate from '../MessageUpdate/MessageUpdate.js'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageRef = this.props.firebase.database().ref('messages');
    this.state = {
      messages: [],
      currentRoom: this.props.currentRoom,
      currentUser: this.props.currentUser
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
      messages: [],
      currentUser: nextProp.currentUser
    });

    if(this.state.query) {
      this.state.query.off('child_added');
    }

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

  }

  callbackCreateNewMessage = (newMessage) => { 
    this.messageRef.push({ 
      content: newMessage,
      name: this.state.currentUser ? this.state.currentUser : "Guest",
      roomId: this.state.currentRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  };
  render() {
    let formatted = this.state.messages.map( (value, index) =>
      <div key={index} className={ "offset-md-2 col-md-10" + (index % 2 ? " message-lightgrey" : "") }>
        <p key={index}> <b> {value.name} - { new Date(value.sentAt).toString() }  : </b>  {value.content} </p>
      </div>
    );

    let submitMessageForm = <MessageUpdate callbackCreateNewMessage={this.callbackCreateNewMessage} messages={ this.state.messages } currentRoom={ this.state.currentRoom }/>;
    formatted.push(submitMessageForm);
    return (
      <div className="row-fluid">
        {this.state.currentRoom === '' ? <h2 className="offset-md-3 col-md-6 announcement">Please click on a room in list to view messages</h2> : formatted }
      </div>
    )

  }
}

export default MessageList;
