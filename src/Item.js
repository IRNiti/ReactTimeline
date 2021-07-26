import React, {Component} from "react";
import {updateName} from "./databaseUtil";

class Item extends Component {
  state = {
    textReadStyle: 'item-content name-content',
    textEditStyle: 'item-hide',
    dateReadStyle: '',
    dateEditStyle: 'item-hide',
    textValue: '',
    startDate: '',
    endDate: '',
    showDates: false,
    duration: this.props.duration,
    startMargin: this.props.item.margin,
    relativePosition: 0,
    allowDrag: false
  }

  showDates = (isShown) => {
    this.setState({
      showDates: isShown
    })
  }



  handleEdit = (event) => {
    this.setState({
      textReadStyle: 'item-hide',
      textEditStyle: 'item-content name-content',
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
      textReadStyle: 'item-content name-content',
      textEditStyle: 'item-hide'
    });
  }

  initiateDrag = (event) => {
    console.log('in initiate drag');
    if (event.button !== 0){
      return;
    }
    this.setState({
      allowDrag: true,
      relativePosition: event.pageX + this.state.startMargin
    })
    event.stopPropagation();
    event.preventDefault();
  }

  exitDrag = (event) => {
    this.setState({
      allowDrag: false
    });
    event.stopPropagation();
    event.preventDefault();
  }

  startDrag = (event) => {
    console.log('starting drag');
    console.log('current cursor position ', event.pageX);
    console.log(this.state.allowDrag);
    console.log('original position ', this.state.relativePosition);
    console.log('original margin', this.state.startMargin);
    console.log('duration ', this.state.duration);

    if (!this.state.allowDrag){
      return;
    }
    const posChange = event.pageX - this.state.relativePosition;
    this.setState(prevState => ({
      startMargin: posChange,
      duration: prevState.duration - posChange/10
    }));
    event.stopPropagation();
    event.preventDefault();
  }

  componentDidUpdate = () => {
    console.log('in component did update')
    if (this.state.allowDrag) {
      document.addEventListener('mousemove', this.startDrag)
      document.addEventListener('mouseup', this.exitDrag)
    } else if (!this.state.allowDrag) {
      document.removeEventListener('mousemove', this.startDrag)
      document.removeEventListener('mouseup', this.exitDrag)
    }
  }

  render() {
    return(
      <div className="lane-item"
           style={{marginLeft : this.state.startMargin}}
           onMouseEnter={() => this.showDates(true)}
           onMouseLeave={() => this.showDates(false)}>
        <div className={this.state.dateReadStyle}>
          <div className="item-start"
               onMouseDown={this.initiateDrag}>
          </div>
          <div className="item-duration" style={{width: this.state.duration}}></div>
          {this.props.duration > 0 &&
            <div className="arrow"
                 draggable="true"
                 style={{marginLeft: this.state.duration}}>
            </div>
          }
        </div>
        {this.state.showDates &&
        <div className='item-content date-content'>
          {this.props.item.start} - {this.props.item.end}
        </div>
        }
        <div
          className={this.state.textReadStyle}
          onDoubleClick={this.handleEdit}>
          {this.props.item.name}
        </div>
        <input
          className={this.state.textEditStyle}
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