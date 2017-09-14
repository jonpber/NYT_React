import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main/Main";

class App extends Component {
	render() {
		return (
			<div className="Wrapper">
				<div className="container">
					<Main />
				</div>
			</div>
		);
	}
}

export default App;
