import React, {Component} from 'react';
import Lane from "./Lane";
import assignLanes from "./assignLanes";

class Timeline extends Component {

	state = {
		lanes: [],
		value: 1
	}

	componentDidMount() {
		this.orderItems();
	}

  orderItems = () => {
    let sortedLanes = assignLanes(this.props.items);

    this.setState({
      lanes: sortedLanes
    });
  }

	render(){
		return(
			<div>
				{this.state.lanes.length > 0 && this.state.lanes.map((lane, i) => (
					<Lane key={i} toDoItems={lane} reorderLanes={this.orderItems}/>
				))}
			</div>
			)
	}
}

export default Timeline;