import React, { Component } from 'react';
import './MessageList.css';

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

  render() {
    //console.log(this.state.currentRoom);
    //console.log(this.state.messages.map( (value, index) => "index: " + index + " message: " + value.content ));

    let formatted = this.state.messages.map( (value, index) =>
      <div key={index} className={ "offset-md-2 col-md-10" + (index % 2 ? " message-lightgrey" : "") }>
        <p key={index}> <b> {value.name}  : </b>  {value.content} </p>
      </div>
    );

    let submitMessageForm = 
        <form onSubmit={console.log("whenever")}>
          <input type="text" className="submit-text offset-md-2 col-md-9" value={console.log("whenever")} onChange={console.log("whenever")} />
          <input type="submit" className="submit-button" value="Send" />
        </form>;
    formatted.push(submitMessageForm);
    
    return (
      <div className="row-fluid">
        {this.state.currentRoom === '' ? <h2 className="offset-md-3 col-md-6 announcement">Please click on a room in list to view messages</h2> : formatted }
      </div>
    )

  }
}

export default MessageList;
