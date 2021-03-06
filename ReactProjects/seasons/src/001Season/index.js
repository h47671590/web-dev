import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	// constructor func is the very first func that is gonna be called when this class is created
	// constructor(porps) {
	// 	super(porps);   // super - parent's constructor function
	// 	// one way to initialize state
	// 	// THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
	// 	this.state = {lat: null, errorMessage: ''}  // if the value is #, set the default to 'null'
	// 	// updating 'state' on a components causes the components to (almost) instantly rerender
	// }
	// Alternate state initialization
	state = {lat: null, errorMessage: ''}  // babeljs will automatically create constructor...
	
	// one-time methods for updating state
	componentDidMount() {
		// get user's location
		window.navigator.geolocation.getCurrentPosition(
			// update state use only setState(), run below when we successfully fetch the position
			(position) => this.setState({lat: position.coords.latitude}),
			(err) => this.setState({errorMessage: err.message})
		);
	}
	
	renderContent() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>
		}
		if (this.state.lat && !this.state.errorMessage) {
			return <SeasonDisplay lat={this.state.lat}/>
		}
		return <Spinner message="please accept location request"/>
	}
	
	// render method - is required for every react components we created - have to define render
	render() {
		return (
			<div className="border red">
				{this.renderContent()}
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.querySelector('#root')
)