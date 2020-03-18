import React,{Component} from "react";
import AddBox from './AddBox.js';
import DeleteBox from './DeleteBox.js';
import './EditPage.css';

export default class EditPage extends Component{
    constructor(props){
        super(props);

        this.state = { isAddOpen: true, isDeleteOpen: false};
    }

    showAddBox() {
        this.setState({ isAddOpen: true, isDeleteOpen: false });
      }
    
    showDeleteBox() {
        this.setState({ isDeleteOpen: true, isAddOpen: false });
    }

    render(){
        return (
            <div>
            <div className="root-container">
        
          <div className="box-controller">
            <div
              className={'controller ' + (this.state.isAddOpen ? 'selected-controller' : '')}
              onClick={this.showAddBox.bind(this)}
            >
              Add
            </div>
            <div
              className={'controller ' + (this.state.isDeleteOpen ? 'selected-controller' : '')}
              onClick={this.showDeleteBox.bind(this)}
            >
              Delete
            </div>
          </div>
          <div className="edit-box-container">
            {this.state.isAddOpen && <AddBox />}
            {this.state.isDeleteOpen && <DeleteBox />}
          </div>
        </div>
        </div>
        );
    }
}