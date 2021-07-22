import React, {Component} from 'react';
import Lane from "./Lane";
import assignLanes from "./assignLanes";

class Timeline extends Component {

	state = {
		lanes: [],
		value: 1
	}

	componentDidMount() {
		let sortedLanes = assignLanes(this.props.items);

		this.setState({
			lanes: sortedLanes
		});
	}

	handleChange = (event) => {
		const userInput = event.target.value;
		this.setState({
			value: userInput
		});
	}

	render(){
		return(
			<div>
				{this.state.lanes.length > 0 && this.state.lanes.map((lane, i) => (
					<Lane key={i} toDoItems={lane}/>
				))}
				<input type="range" min="1" max="500" value={this.state.value} onChange={this.handleChange}/>
			</div>
			)
	}
}

export default Timeline;