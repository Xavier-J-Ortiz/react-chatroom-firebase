import React, { Component } from 'react';



class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.currentUser
    };
  }

  newUserClick() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    this.props.firebase.auth().signInWithPopup( provider  ).then((authData) => {
      this.setState( { userName: authData.user.displayName } );
      this.props.currentUserCallback(this.state.userName);
    }).catch(function(error) {
      console.log(error);
    });
  }

  signOutClick() {
    this.props.firebase.auth().signOut().then(() => {
      console.log('you have been successfully signed out!');
      this.setState( { userName: null } );
      this.props.currentUserCallback(this.state.userName);
    }, function(error) {
      console.log(error);
    });
  }

  componentWillMount() {
  }
  render() {
    console.log("User Render userName: " + this.state.userName)
    if (this.state.userName) { 
      return (
          <div className="announcement row">
            <h3 className="offset-md-2 col-md-8">Hello { this.state.userName } </h3>
            <button type='button' className='btn btn-danger offset-md-1 col-md-1' onClick={() => this.signOutClick()}> Sign Out </button>
        </div>
      )
    } else {
      return (
          <div className="announcement row">
            <h3 className="offset-md-2 col-md-8">Hello Guest!</h3>
            <button type='button' className='btn btn-default offset-md-1 col-md-1' onClick={() => this.newUserClick()}> User Sign In </button>
          </div>
      )
    }
  }
}

export default User;
