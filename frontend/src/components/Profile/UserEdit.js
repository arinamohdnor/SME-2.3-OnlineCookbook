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
      selectedFile: null,
      selectedFileName: '',
      message: ''
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.onChange = this.onChange.bind(this);

    if(!this.props.user){
      axios
          .get('/users')
          .then(res => {
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

  onChange(e) {
    this.setState({file:e.target.files[0]});
}

  fileSelectedHandler = event => {

      this.setState({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name,
        loaded: 0,
      })
  }
  


  submitEdit = () =>{
    const { user, user_id, usernameInput, firstnameInput, lastnameInput, imageInput, emailInput, relogin, selectedFileName } = this.state

    console.log(selectedFileName);

    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('usernameInput', usernameInput);
    data.append('firstnameInput', firstnameInput);
    data.append('lastnameInput', lastnameInput);
    data.append('emailInput', emailInput);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
    axios.patch(`/users/edit/${user.user_id}`, data, config)      
      .then(res => {
        console.log(res.statusText)
      })

      axios
        .patch(`/users/edit/${user.user_id}`, {
          username: usernameInput ? usernameInput : user.username,
          first_name: firstnameInput ? firstnameInput: user.first_name,
          last_name: lastnameInput ? lastnameInput : user.last_name,
          imageInput: selectedFileName ? selectedFileName : user.user_img,
          email: emailInput ? emailInput : user.email,
          user_id: user.user_id ? user.user_id : user.user_id
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

            <form onSubmit={this.handleSubmit} encType="multipart/form-data">

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
                      type='file'
                      name='file'
                      onChange={this.fileSelectedHandler}
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
