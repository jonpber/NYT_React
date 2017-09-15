import React from "react";
import "./Results.css";

  const Results = (props) => {
  		let resultArray = props.results.map(results => 
  			<div>
	  				<p>{results.headline.main}</p>
	  				<button>Save</button>
  				</div>
 
  			)
  		console.log(props.results)
		return (
		<div className="col-xs-12 jumbotron">
			<h2 className="col-xs-12">Results</h2>
			{resultArray}
		</div>
    )
}

export default Results;
