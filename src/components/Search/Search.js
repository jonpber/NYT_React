import React from "react";
import Query from "../Query/Query";
import Results from "../Results/Results";
  const Search = (props) => (
		<div>
			<Query handler={props.handler}/>
			<Results results={props.results}/>
		</div>
    )

export default Search;
