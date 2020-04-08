import React from 'react';
import {Form, FormGroup, Input, Label, Button, ButtonGroup} from 'reactstrap';
import axios from 'axios';

export default class AddBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', birthyear: '', deathyear: '', occupation: '', gender: '', errors: [] , options: [
      'Option 1', 'Option 2', 'Option 3', 'Option 4'
    ], activeSelected: 0}
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
    console.log(e.target.value);
  }

  onBirthYearChange(e) {
    this.setState({ birthyear: e.target.value });
    this.clearValidationErr('birthyear');
    console.log(e.target.value);
  }

  onDeathYearChange(e) {
    this.setState({ deathyear: e.target.value });
    this.clearValidationErr('deathyear');
    console.log(e.target.value);
  }

  onOccupationChange(e) {
    this.setState({ occupation: e.target.value });
    this.clearValidationErr('occupation');
    console.log(e.target.value);
  }

  onGenderChange(e) {
    console.log(e.target.value);
    this.setState({ gender: e.target.value });
    this.setState({ activeSelected: e.target.value});
    this.clearValidationErr('gender');
    
  }

  submitAdd(e) {
    if (this.state.name === '' || this.state.birthyear === '') {
      this.showValidationErr('error', 'Please fill required fields');
    }

    console.log('Submitting Data or Something!');
    axios.post('http://localhost:8080/familytree/add', {fullName: this.state.name, birthYear: this.state.birthyear}).then((response) => {
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
                <div className="divider"/>
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
                <div className="divider"/>
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
                <div className="divider"/>
                <input
                type="text"
                name="occupation"
                className="add-input"
                placeholder="Job Title"
                onChange={this.onBirthYearChange.bind(this)}
                /> 
            </span>

            <span>
              <label className="add-label" htmlFor="gender">Gender</label>
              <ButtonGroup className = "gender-button-group">
                <Button outline color="primary" style={{width: '8vw'}} value = "male" onClick={this.onGenderChange.bind(this)} active={this.state.activeSelected === "male"}>Male</Button>
                <Button outline color="danger" style={{width: '8vw'}} value = "female" onClick={this.onGenderChange.bind(this)} active={this.state.activeSelected === "female"}>Female</Button>
                <Button outline color="warning" style={{width: '8vw'}} value = "other" onClick={this.onGenderChange.bind(this)} active={this.state.activeSelected === "other"}>Other</Button>
              </ButtonGroup>
            </span>

            <Form>
              <FormGroup>
                <Label for="exampleSelect">Associated Family</Label>
                <Input type="select" name="select" id="exampleSelect">
                  {
                    this.state.options.map((value, key) => {
                    return <option key={key}>{value}</option>;
                    })
                  }
                </Input>
              </FormGroup>
            </Form>
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
