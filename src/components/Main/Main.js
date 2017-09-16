import React, { Component } from 'react';
import Search from "../Search/Search";
import Saved from "../Saved/Saved";
import "./Main.css";
import Axios from "axios"

 class Main extends Component {
  render() {
  	return (<div className="row">
		<div className = "col-xs-12 jumbotron">
			<h1>NYT Search</h1>
		</div>

		<Search/>

		<Saved />
	</div>)
    }
}

export default Main;
