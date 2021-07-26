import React, {Component} from "react";
import Item from "./Item";

class Lane extends Component{

  state = {
    itemsWithMargin: []
  }

  componentDidMount() {
    let items = this.props.toDoItems;
    /*for(let item of this.props.toDoItems){
        let augmentedItem = item;
        const margin = (new Date(item.start) - new Date(this.props.toDoItems[0].start))/(1000*60*60*24);
        augmentedItem['margin'] = margin;
        items.push(augmentedItem);
    }*/

    items.forEach((item, i) => {
      let margin = 0;
      if(i != 0){
        margin = (new Date(item.start) - new Date(items[i-1].start))/(1000*60*60*24);
      }
      item['margin'] = margin;
    });
    this.setState({
      itemsWithMargin: items
    });
  }



  render() {
    return(
      <div className="lane">
        <div className="lane-items">
          {this.state.itemsWithMargin && this.state.itemsWithMargin.map((item, i) => (
            <Item key={i} item={item} duration={(item.endIndex - item.startIndex + 1)*10}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Lane;