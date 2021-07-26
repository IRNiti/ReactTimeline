import React, {Component} from "react";
import {updateProp} from "./databaseUtil";

class Item extends Component {
  state = {
    textReadStyle: 'item-content name-content',
    textEditStyle: 'item-hide',
    textValue: '',
    startDate: this.props.item.start,
    endDate: this.props.item.end,
    showDates: false,
    duration: this.props.duration,
    originalDuration: this.props.duration,
    startMargin: this.props.item.margin,
    relativePositionStart: 0,
    relativePositionEnd: 0,
    allowDragStart: false,
    allowDragEnd: false
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
    updateProp({
      id: this.props.item.id,
      name: this.state.textValue
    }, 'name');
    this.setState({
      textReadStyle: 'item-content name-content',
      textEditStyle: 'item-hide'
    });
  }

  initiateDrag = (event, dragType) => {
    if (event.button !== 0){
      return;
    }
    if(dragType === 'start'){
      this.setState({
        allowDragStart: true,
        relativePositionStart: event.pageX - this.state.startMargin
      })
    } else if(dragType === 'end'){
      this.setState({
        allowDragEnd: true,
        relativePositionEnd: event.pageX,
        originalDuration: this.state.duration
      })
    }
    event.stopPropagation();
    event.preventDefault();
  }

  exitDrag = (event, dragType) => {
    if(dragType === 'start'){
      this.setState({
        allowDragStart: false
      });
      updateProp({
        id: this.props.item.id,
        start: this.state.startDate
      }, 'start');
    } else if(dragType === 'end'){
      this.setState({
        allowDragEnd: false,
        originalDuration: this.state.duration
      });
      updateProp({
        id: this.props.item.id,
        end: this.state.endDate
      }, 'end');
    }
    this.props.orderItemsInTimeline();
    event.stopPropagation();
    event.preventDefault();
  }

  startDragStart = (event) => {
    this.startDrag(event, 'start');
  }

  stopDragStart = (event) => {
    this.exitDrag(event, 'start');
  }

  startDragEnd = (event) => {
    this.startDrag(event, 'end');
  }

  stopDragEnd = (event) => {
    this.exitDrag(event, 'end');
  }

  startDrag = (event, dragType) => {
    if(dragType === 'start'){
      if (!this.state.allowDragStart){
        return;
      }
      const posChange = event.pageX - this.state.relativePositionStart;
      let newDate = new Date(this.props.item.start);
      const newStartDate = (new Date(newDate.setDate(newDate.getDate() + posChange/10))).toISOString().substring(0, 10);
      this.setState({
        startMargin: posChange,
        duration: this.props.duration - posChange,
        startDate: newStartDate
      });
    } else if(dragType === 'end'){
      if (!this.state.allowDragEnd){
        return;
      }
      const posChange = event.pageX - this.state.relativePositionEnd;
      let newDate = new Date(this.props.item.end);
      const newEndDate = (new Date(newDate.setDate(newDate.getDate() + posChange/10))).toISOString().substring(0, 10);
      this.setState({
        duration: this.state.originalDuration + posChange,
        endDate: newEndDate
      });
    }
    event.stopPropagation();
    event.preventDefault();
  }

  componentDidUpdate = () => {
    if (this.state.allowDragStart) {
      document.addEventListener('mousemove', this.startDragStart);
      document.addEventListener('mouseup', this.stopDragStart);
    } else if (!this.state.allowDragStart) {
      document.removeEventListener('mousemove', this.startDragStart);
      document.removeEventListener('mouseup', this.stopDragStart);
    }
    if(this.state.allowDragEnd){
      document.addEventListener('mousemove', this.startDragEnd);
      document.addEventListener('mouseup', this.stopDragEnd);
    } else if(!this.state.allowDragEnd){
      document.removeEventListener('mousemove', this.startDragEnd);
      document.removeEventListener('mouseup', this.stopDragEnd);
    }
  }

  render() {
    return(
      <div className="lane-item"
           style={{marginLeft : this.state.startMargin}}
           onMouseEnter={() => this.showDates(true)}
           onMouseLeave={() => this.showDates(false)}>
          <div className="item-start"
               onMouseDown={(event) => {this.initiateDrag(event, 'start')}}>
          </div>
          <div className="item-duration" style={{width: this.state.duration}}></div>
          {this.props.duration > 0 &&
            <div className="arrow"
                 onMouseDown={(event) => {this.initiateDrag(event, 'end')}}
                 style={{marginLeft: this.state.duration}}>
            </div>
          }
        {this.state.showDates &&
        <div className='item-content date-content'>
          {this.state.startDate} - {this.state.endDate}
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