var express = require("express");
var app = express();
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
// var mongojs = require("mongojs");

var body = require("body-parser");

var mongoose = require("mongoose");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

mongoose.Promise = Promise;

// mongoose.connect("mongodb://heroku_ldt50bdv:ll4htkdn9a39b6s743bqc0la2a@ds161713.mlab.com:61713/heroku_ldt50bdv");
var db = mongoose.connection;

// var db = mongojs(databaseUrl, collections);
// var ObjectId = require("mongojs").ObjectId;



router.get("/", function(req, res){
	Article.find({saved: false}).sort({date: -1}).exec(function(error, doc){
		res.render("index", {articles: doc});
	})

});

router.get("/scrape", function(req, res){
	request("https://www.nytimes.com/section/world", function(error, response, html) {
		let $ = cheerio.load(html);
		let results = [];
		let added = 0;
		$(".headline").each(function(i, element) {
			if (i < 10){
				let link = $(element).children("a").attr("href");
				let title = $(element).text();
			
				request(link, function(error1, response1, html1){
					$1 = cheerio.load(html1);

					$1(".story-body-1").each(function(i1, element1){
						if (i1 === 0){
							let image = $1(element1).children(".media.photo").attr("itemid");

							if (image == null){
								image = "https://f4.bcbits.com/img/a1322149552_10.jpg";
							}
							// story-body-text
							let summary = $1(element1).children(".story-body-text").text();

							summary = summary.slice(0, 250);
							summary = summary + "... (click to read article)";

							let article = new Article({
								title: title,
								link: link,
								img: image,
								summary: summary
							})

							article.save(function(error, doc){
								if (error){
									
								}

								else {
									added += 1;
									console.log(added)
								}
							})
						}
					})
				})
			}

			else if (i === 11) {
				setTimeout(function(){
					Article.find({saved: false}).sort({date: -1}).exec(function(error, doc){
						res.json({found: doc,
							added: added});
				    	})
				}, 1000)
				
			}
			
		});
	})
});

router.get("/saved", function(req, res){
	Article.find({saved: true}).sort({date: -1}).exec(function(error, doc){
		res.render("saved", {articles: doc});
	})

});

router.get("/articles/:id", function(req, res){
	Article.findOne({"_id": req.params.id})
	.populate("comments")
	.exec(function(error, result){
		if (error){
			res.send(error)
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
})

router.put("/articles/:id", function(req, res){
	Article.findOneAndUpdate({_id: req.params.id}, {$set:{
		saved: true
	}}, function(error, result){
		res.redirect("/");
	})
})

router.post("/articles/:id", function(req, res){
	let comment = new Comment({comment: req.body.comment});

	comment.save(function(error, doc){
		if (error){
			res.send(error)
		}
		else {
			Article.findOneAndUpdate({_id: req.params.id}, { $push: { "comments": doc._id } }, { new: true }, function(err, newdoc) {
			// Send any errors to the browser
			if (err) {
				res.send(err);
			}
			// Or send the newdoc to the browser
			else {
				res.send(newdoc);
			}
		});
		}
	})
})

router.delete("/articles/:id", function(req, res){
	Article.remove({_id: req.params.id}, function(err){
		res.redirect("/saved");
	})
})

router.delete("/articles/comments/:id", function(req, res){
	Comment.remove({_id: req.params.id}, function(error){
		if(error){
			res.send(error)
		}

		else {
			res.send("");
		}
	})
})

module.exports = router;