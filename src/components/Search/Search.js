import React, { Component } from 'react';
import Query from "../Query/Query";
import Results from "../Results/Results";
import Axios from "axios"

class Search extends Component {
	state = {
		results: []
	}

	getResults = (event) => {
		event.preventDefault();
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

	render () {
		return (
			<div>
				<Query handler={this.getResults}/>
				<Results results={this.state.results}/>
			</div>
			)
	}

}

export default Search;
