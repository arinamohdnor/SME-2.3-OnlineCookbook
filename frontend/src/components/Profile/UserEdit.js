import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Searchbar from "../Search/SearchBar";
class UserEdit extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      user: '',
      usernameInput: '',
      firstnameInput: '',
      lastnameInput: '',
      emailInput: '',
      imageInput: '',
      message: ''
    }

    if(!this.props.user){
      axios
          .get('/users')
          .then(res => {
            console.log(res.data[0]);
            this.setState({ user: res.data[0]});
          })
          .catch(error => {
            console.log('error in edit page')
          })
    }
  }

  componentDidMount() {
    if(!this.props.user){
      axios
        .get('/users')
        .then(res => {
          this.setState({ user: res.data[0]});
          console.log(res.data[0].username);
          this.state.usernameInput = res.data[0].username;
          this.state.firstnameInput = res.data[0].first_name;
          this.state.lastnameInput = res.data[0].last_name;
          this.state.emailInput = res.data[0].email;
        })
        .catch(error => {
          console.log('error in edit page')
        })
    }
  }

  userInput = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  submitEdit = () =>{
    const { user, usernameInput, firstnameInput, lastnameInput, imageInput, emailInput, relogin } = this.state

      axios
        .patch(`/users/edit/${user.user_id}`,{
          username: usernameInput ? usernameInput : user.username,
          first_name: firstnameInput ? firstnameInput: user.first_name,
          last_name: lastnameInput ? lastnameInput : user.last_name,
          imageInput: imageInput ? imageInput : user.user_img,
          email: emailInput ? emailInput : user.email
      })
        .then(() => {
          this.setState({
            message: 'Changes done!'
          })
        })
    }


  render(){
    const {  user, usernameInput, firstnameInput, lastnameInput, imageInput, emailInput, message } = this.state

    if (user) {
      let path = `/cb/profile/${user.user_id}`
        return(
          <div className="formContainer">
            <div className="formStyle">
            <h1 className="formHeader">Edit Profile Information for {user.username}</h1>

            <form onSubmit={this.handleSubmit}>

          <div className="formSection">
              <div className="formInnerWrap">
                      <label className="formlabels">
                          New Username: {" "}
                          <input
                            type='text'
                            name='usernameInput'
                            onChange={this.userInput}
                            value={usernameInput}
                            className="formInput"
                            required
                            />
                      </label>
                </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                    New Profile Image: {" "}
                    <input
                      type='image'
                      name='imageInput'
                      onChange={this.userInput}
                      value={imageInput}
                      className="formInput"
                      required
                      />
                </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                  New First Name: {" "}
                  <input
                    type='text'
                    name='firstnameInput'
                    onChange={this.userInput}
                    value={firstnameInput}
                    className="formInput"
                    required
                    />
                </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                  New Last Name: {" "}
                  <input
                    type='text'   
                    name='lastnameInput'
                    onChange={this.userInput}
                    value={lastnameInput}
                    className="formInput"
                    required
                    />
                </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <div className="formlabels">
                  <label className="formlabels">
                    New Email: {" "}
                    <input
                      type='email'
                      name='emailInput'
                      onChange={this.userInput}
                      value={emailInput}
                      required
                      />
                  </label>
                </div>
              </div>
            </div>


            <button onClick={this.submitEdit} className="formButton">Submit Changes</button>
            <Link to={path}>Back to Profile</Link>
            </form>
            </div>
          </div>
        )
  }
    else {
      return (
        <div>loading!</div>
      )
    }
  }
}

export default UserEdit
