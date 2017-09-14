import React, { Component } from 'react';
import Search from "../Search/Search";
import Saved from "../Saved/Saved";
import Axios from "axios"

 class Main extends Component {
 	state = {
		results: []
	}

	getResults = () => {
		let topic = document.getElementById("topicEntry").value;
		let startDate = document.getElementById("startEntry").value;
		let endDate = document.getElementById("endEntry").value;
		let query = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e6543811ed1849f3beb85990f7f3bb80&
		q=${topic}
		&begin_date=${startDate}0101
		&end_date=${endDate}1231
		`
		Axios.get(query)
			.then(res => {
				let results = res.data.response.docs;
				let articles = results.slice(0, 5);
				this.setState({results: articles})

		});
	  }
	  	
  render() {
  	return (<div className="row">
		<div className = "col-xs-12">
			<div className="jumbotron">
				<h1>NYT Search</h1>
			</div>
		</div>

		<Search handler={this.getResults} results={this.state.results}/>

		<Saved />
	</div>)
    }
}

export default Main;
