import React from 'react';
import axios from 'axios';

export default class DeleteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', errors: [] };
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({ errors: [...prevState.errors, { elm, msg }] }));
  }

  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onNameChange(e) {
    this.setState({ Name: e.target.value });
    this.clearValidationErr('Name');
  }

  submitAdd(e) {
    if (this.state.name === '') {
      this.showValidationErr('error', 'Name does not exist, please try again.');
    }

    console.log('Logging in!');
    axios.post('http://localhost:8080/auth/Add', {}, { params: { Name: this.state.Name, password: this.state.password }}).then((response) => {
      console.log(response);
    });

  }

  render() {
    let error = false;

    for (let err of this.state.errors) {
      if (err.elm === 'error') {
        error = err.msg;
      }
    }

    return (
      <div className="inner-container">
        <div className="header">Delete Relative</div>
        <div className="box">
          <div className="input-group">
            <span>
                <label className="add-label" htmlFor="name">Full Name </label>
                <div class="divider"/>
                <input
                type="text"
                name="name"
                className="add-input"
                onChange={this.onNameChange.bind(this)}
                /> 
            </span>
            <small className="danger-error">{error} </small>
          </div>


          <button type="button" className="add-btn" onClick={this.submitAdd.bind(this)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
