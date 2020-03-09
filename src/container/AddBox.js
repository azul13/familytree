import React from 'react';
import axios from 'axios';

export default class AddBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', birthyear: '', deathyear: '', occupation: '', gender: '', errors: [] };
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
    this.setState({ name: e.target.value });
    this.clearValidationErr('name');
  }

  onBirthYearChange(e) {
    this.setState({ birthyear: e.target.value });
    this.clearValidationErr('birthyear');
  }

  onDeathYearChange(e) {
    this.setState({ deathyear: e.target.value });
    this.clearValidationErr('deathyear');
  }

  onOccupationChange(e) {
    this.setState({ occupation: e.target.value });
    this.clearValidationErr('occupation');
  }

  onGenderChange(e) {
    this.setState({ gender: e.target.value });
    this.clearValidationErr('gender');
  }

  submitAdd(e) {
    if (this.state.name === '' || this.state.birthyear === '') {
      this.showValidationErr('error', 'Please fill required fields');
    }

    console.log('Logging in!');
    axios.post('http://localhost:8080/auth/Add', {}, { 
        params: { name: this.state.name, birthyear: this.state.birthyear }}).then((response) => {
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
        <div className="header">Add Relative</div>
        <div className="box">

          <div className="input-group">
          <span>
                <label className="add-label" htmlFor="name">Full Name</label>
                <div class="divider"/>
                <input
                type="text"
                name="name"
                className="add-input"
                placeholder="Name"
                onChange={this.onNameChange.bind(this)}
                /> 
            </span>
          </div>

          <div className="input-group">
          <span>
                <label className="add-label" htmlFor="birthyear">Year of Birth</label>
                <div class="divider"/>
                <input
                type="text"
                name="birthyear"
                className="add-input"
                placeholder="Year"
                onChange={this.onBirthYearChange.bind(this)}
                /> 
            </span>
          </div>

          <div className="input-group">
          <span>
                <label className="add-label" htmlFor="deathyear">Year of Death</label>
                <div class="divider"/>
                <input
                type="text"
                name="deathyear"
                className="add-input"
                placeholder="Year"
                onChange={this.onDeathYearChange.bind(this)}
                /> 
            </span>
          </div>

          <div className="input-group">
          <span>
                <label className="add-label" htmlFor="occupation">Occupation</label>
                <div class="divider"/>
                <input
                type="text"
                name="occupation"
                className="add-input"
                placeholder="Job Title"
                onChange={this.onBirthYearChange.bind(this)}
                /> 
            </span>
            <form className="radio-label">
              <input type="radio" id="male" name="gender" value="male"></input><div class="small-divider"/>
              <label for="male"> Male</label><div class="divider"/>
              <input type="radio" id="female" name="gender" value="female"></input><div class="small-divider"/>
              <label for="female"> Female</label><div class="divider"/>
              <input type="radio" id="other" name="gender" value="other"></input><div class="small-divider"/>
              <label for="other"> Other</label><div class="divider"/>
            </form> 
            <small className="add-error">{error} </small>
          </div>

          <button type="button" className="add-btn" onClick={this.submitAdd.bind(this)}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
