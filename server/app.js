const express = require('express')
var cors=require('cors')
const app = express()
const port = process.env.PORT||4000
app.use(cors());

app.get('/query1', (req, res) =>{  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
year=[]
matches=[]
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if (err) throw err;
  var dbo = db.db("matches");
  dbo.collection("matches").aggregate([{ "$group" : {_id:"$season", count:{$sum:1}}}]).toArray(function(err, result) {
    if (err) throw err;
   
   for(i=0;i<result.length;i++)
   {
    year[i]=result[i]._id;
    matches[i]=result[i].count;
   }
   console.log(year);
   console.log(matches);
   res.send(result);
 
  });
});
   
});


app.get('/query2', (req, res) =>{  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
 
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("matches");
    dbo.collection("matches").aggregate([{ "$group" : {_id:{season:"$season",winner:"$winner"}, count:{$sum:1}}},{"$project":{season:"$_id.season",winner:"$_id.winner",count:"$count"}},{"$group":{"_id":"$season",teams:{$push:{winner:"$winner",count:"$count"}}}}]).toArray(function(err, result) {
      if (err) throw err;
      result.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0));
     res.send(result);
    });
  });
     
  });

  app.get('/query3', (req, res) =>{  
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    year=[]
    team=[]
    count=[]
    var first,last;
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
      if (err) throw err;
      var dbo = db.db("matches");
      dbo.collection("matches").find({season:2016}).toArray(function(err, result) {
         if (err) throw err;
       
       for(i=0;i<result.length;i++)
       {
        year[i]=result[i].id;
       }
       first=year[0];
       last=year[year.length-1];
      // console.log(year);  
      dbo.collection("deliveries").aggregate([{"$match":{ "match_id" : { "$lt" : last} , "$and" : [ { "match_id" : { "$gt" : first}}]}},{ "$group" : {_id:{batting_team:"$batting_team"}, count:{$sum:"$extra_runs"}}}]).toArray(function(err, result1) {
        if (err) throw err;
      
      for(i=0;i<result1.length;i++)
      {
       team[i]=result1[i].batting_team;
      }
      console.log(result1);
      res.send(result1);
     });
    });
    });
       
    });
    app.get('/query4', (req, res) =>{  
      var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
year=[];
team=[];
count=[];
bowler=[];
runs=[];
balls=[];
econ=[];
dict={};
arr=[];
var first,last;
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if (err) throw err;
  var dbo = db.db("matches");
  dbo.collection("matches").find({season:2015}).toArray(function(err, result) {
     if (err) throw err;
   
   for(i=0;i<result.length;i++)
   {
    year[i]=result[i].id;
   }
   first=year[0];
   last=year[year.length-1];
  // console.log(year);  
  dbo.collection("deliveries").aggregate([{"$match":{ "match_id" : { "$lt" : last} , "$and" : [ { "match_id" : { "$gt" : first}}]}},{ "$group" : {_id:{bowler:"$bowler"},num:{$sum:"$total_runs"},den:{$sum:1}}}]).toArray(function(err, result1) {
    if (err) throw err;
  
  for(i=0;i<result1.length;i++)
  {
   bowler[i]=result1[i]._id.bowler;
   runs[i]=Number(result1[i].num);
   balls[i]=Number(result1[i].den);
   econ[i]=Number((runs[i]/balls[i])*6);
   dict[bowler[i]]=econ[i];
   arr[i]=[econ[i],bowler[i]].join("");
  }
  res.send(result1);
 econ.sort();
  console.log(econ);
  typeof(balls);
  
 });
});
});
      });

      app.get('/query5', (req, res) =>{  
        var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
year=[]
team=[]
count=[]
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if (err) throw err;
  var dbo = db.db("matches");
  dbo.collection("matches").aggregate([{$match: {$expr: {$eq: ['$toss_winner','$winner']}}},{ "$group" : {_id:{winner:"$winner"},count:{$sum:1}}}]).toArray(function(err, result) {
    if (err) throw err;
   
  
   res.send(result);
  
  });
});
        });
  


app.listen(port, () => console.log(`Example app listening on port ${port}!`))