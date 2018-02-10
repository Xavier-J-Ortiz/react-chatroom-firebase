import React, { Component } from 'react';

class MessageUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
      currentRoom: this.props.currentRoom,
      newMessage: ""
    };


  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      messages: this.props.messages,
      currentRoom: this.props.currentRoom
    });
  }

  detectChange(e) {
    this.setState( { newMessage: e.target.value } );
  }

  createNewMessage(e){
    e.preventDefault();
    this.props.callbackCreateNewMessage(this.state.newMessage);
  }

  render() {
    return(    <form onSubmit={ (e) => this.createNewMessage(e) }>
      <input type="text" className="submit-text offset-md-2 col-md-9" value={ this.state.newMessage || "" } onChange={ (e) => this.detectChange(e) } />
      <input type="submit" className="submit-button" value="Send" />
    </form>
    )

  }
}

export default MessageUpdate;
