import React, { Component } from 'react';
import Axios from "axios"

class Saved extends Component {
	componentDidMount() {
		console.log("mounted")
		Axios.get("/api/saved")
			.then(res => {
				console.log(res);
		});
	}

	render() {
		return (
		<div className="jumbotron col-xs-12">
			<h2 className="col-xs-12">Saved</h2>
		</div>
		)
	}

}

export default Saved;
