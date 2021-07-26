import React, {Component} from "react";
import Item from "./Item";

class Lane extends Component{

  render() {
    return(
      <div className="lane">
        <div className="lane-items">
          {this.props.toDoItems && this.props.toDoItems.map((item, i) => (
            <Item
              key={i}
              item={item}
              duration={(item.endIndex - item.startIndex + 1)*10}
              orderItemsInTimeline={this.props.reorderLanes}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Lane;