import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="Wrapper">
				<div className="container">
					<Router>
						<Route path="/" component={Main} />
					</Router>
				</div>

			</div>
		);
	}
}

export default App;
