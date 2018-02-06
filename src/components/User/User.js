import React, { Component } from 'react';



class User extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  newUserClick() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    this.props.firebase.auth().signInWithPopup( provider  ).then((authData) => {
      //console.log(authData);
      //console.log(authData.user.displayName);
      this.setState( { userName: authData.user.displayName } );
    }).catch(function(error) {
      console.log(error);
    });
  }

  signOutClick() {
    this.props.firebase.auth().signOut().then(() => {
      console.log('you have been successfully signed out!');
      this.setState( { userName: null } );
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    if (this.state.userName) { 
      return (
        <div>
          <h3>Hello { this.state.userName } </h3>
          <button type='button' className='btn btn-danger' onClick={() => this.signOutClick()}> Sign Out </button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Hello Guest!</h3>
          <button type='button' className='btn btn-default'onClick={() => this.newUserClick()}> User Sign In </button>
        </div>
      )
    }
  }
}

export default User;
