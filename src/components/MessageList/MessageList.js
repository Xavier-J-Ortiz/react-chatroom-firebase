import React, { Component } from 'react';
import './MessageList.css';
import MessageUpdate from '../MessageUpdate/MessageUpdate.js'

class MessageList extends Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  callbackCreateNewMessage = (newMessage) => { 
    this.messageRef.push({ 
      content: newMessage,
      name: this.state.currentUser ? this.state.currentUser : "Guest",
      roomId: this.state.currentRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  };

  constructor(props) {
    super(props);
    this.messageRef = this.props.firebase.database().ref('messages');
    this.state = {
      messages: [],
      currentRoom: this.props.currentRoom,
      currentRoomName: this.props.currentRoomName,
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

    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }

  componentWillReceiveProps(nextProp) {
    if(this.state.currentRoom !== nextProp.currentRoom) {

      if(this.state.query) { 
        this.state.query.off('child_added');
      }

      var query = this.messageRef.orderByChild('roomId').equalTo(nextProp.currentRoom);

      query.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({
          currentRoom: nextProp.currentRoom,
          currentRoomName: nextProp.currentRoomName,
          messages: this.state.messages.concat(message),
          new_message: '',
          query: query
        })
      });

      this.setState({ 
        currentRoom: nextProp.currentRoom,
        currentRoomName: nextProp.currentRoomName,
        messages: [],
        query: query
      });

    } else if (this.state.currentUser !== nextProp.currentUser) {
      this.setState({ 
        currentUser: nextProp.currentUser,
      });
      return
    }
  }

  componentDidUpdate() {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }

  render() {
    let formatted = this.state.messages.map( (value, index) =>
      <div key={index} className={ "offset-md-2 col-md-10" + (index % 2 ? " message-lightgrey" : "") }>
        <p key={index}> <b> {value.name} - { new Date(value.sentAt).toString() }  : </b>  {value.content} </p>
      </div>
    );

    let roomAnnouncement = <h3 key="-1" className="offset-md-2 col-md-8 announcement"> You are currently viewing messages from <b>{this.state.currentRoomName}</b> </h3>;
    let findMeDiv = <div key={formatted.length } className="findMe"
      ref={(el) => { this.messagesEnd = el; }}>
    </div>;
    let submitMessageForm = 
      <div key={ formatted.length + 1 } className="fixed-bottom">
        <MessageUpdate callbackCreateNewMessage={this.callbackCreateNewMessage} messages={ this.state.messages } currentRoom={ this.state.currentRoom }/>
      </div>;
    formatted.unshift(roomAnnouncement);
    formatted.push(findMeDiv);
    if (this.state.currentUser) {
      formatted.push(submitMessageForm);
    }
    return (
      <div className="row-fluid">
        {this.state.currentRoom === '' ? <h2 className="offset-md-3 col-md-6 announcement">Please click on a room in list to view messages</h2> : formatted }
      </div>
    )

  }
}

export default MessageList;
