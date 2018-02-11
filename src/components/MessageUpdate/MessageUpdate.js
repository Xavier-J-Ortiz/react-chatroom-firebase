import React, { Component } from 'react';
import './MessageUpdate.css'

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
    return(    
      <form onSubmit={ (e) => this.createNewMessage(e) }>
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <input type="text" className="submit-text col-md-12" value={ this.state.newMessage || "" } onChange={ (e) => this.detectChange(e) } />
          </div>
          <div className="col-md-2">
            <input type="submit" className="submit-button offset-md-1 col-md-9" value="Send" />
          </div>
        </div>
      </form>
    )

  }
}

export default MessageUpdate;
