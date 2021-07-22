import React, {Component} from "react";
import {updateName} from "./databaseUtil";

class Item extends Component {
  state = {
    readStyle: 'item-content',
    editStyle: 'item-hide',
    textValue: ''
  }

  handleEdit = (event) => {
    this.setState({
      readStyle: 'item-hide',
      editStyle: 'item-content',
      textValue: this.props.item.name
    });
  }

  handleTextChange = (event) => {
    this.setState({
      textValue: event.target.value
    });
  }

  handleSave = (event) => {
    updateName({
      id: this.props.item.id,
      name: this.state.textValue
    });
    this.setState({
      readStyle: 'item-content',
      editStyle: 'item-hide'
    });
  }

  render() {
    return(
      <div className="lane-item" style={{marginLeft : this.props.item.margin}}>
        <div
          className={this.state.readStyle}
          onDoubleClick={this.handleEdit}>
          {this.props.item.name}
        </div>
        <input
          className={this.state.editStyle}
          type="text"
          value={this.state.textValue}
          onChange={this.handleTextChange}
          onBlur={this.handleSave}
        />
      </div>
    );
  }
}

export default Item;