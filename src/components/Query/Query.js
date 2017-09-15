import React from "react";
  const Query = (props) => (
		<div className="col-xs-12 jumbotron">
			<h2 className="col-xs-12">Search</h2>
			<form>
				<div className="form-group">
					<label for="topicInput">Topic</label>
					<input type="text" className="form-control" id="topicEntry" aria-describedby="topic" placeholder="Topic" required={true}/>
				</div>
				<div className="form-group">
					<label for="startYear">Start Year</label>
					<input type="number" className="form-control" id="startEntry" aria-describedby="emailHelp" placeholder="Start Year" required={true}/>
				</div>
				<div className="form-group">
					<label for="endYear">End Year</label>
					<input type="numbers" className="form-control" id="endEntry" placeholder="End Year" required={true}/>
				</div>

				<button type="submit" className="btn btn-primary" onClick={props.handler}>Submit</button>
			</form>
			
		</div>
    )

export default Query;
