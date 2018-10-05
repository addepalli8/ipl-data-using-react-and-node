import React, {
  Component
} from 'react';
import './App.css';
import {
  Bar
} from 'react-chartjs-2';



class App extends Component {

  state = {
    Data: {},
    Datat2: {},
    Data3: {},
    Data4: {},
    Data5: {},
    val: []


  };


  componentDidMount() {
    this.query1();
    this.query2();
    this.query3();
    this.query4();
    this.query5();
  }
  query1 = () => {
    var x1 = [];
    var y1 = [];
    fetch("http://localhost:4000/query1")
      .then(data => data.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          x1.push(res[i]._id);
          y1.push(res[i].count);
        }
        this.setState({
          Data: {
            labels: x1,
            datasets: [{
              label: "Matches",
              data: y1,
              backgroundColor: [
                "rgba(255, 0, 0)",
                "rgba(0, 0, 235)",
                "rgba(0, 255, 0)",
                "rgba(255, 255, 0)",
                "rgba(255, 0, 235)",
                "rgba(0, 25, 255)",
                "rgba(0, 55, 0)",
                "rgba(255, 0, 255)",
                "rgba(25, 0, 235)",
                "rgba(0, 0, 0)"
              ]

            }]
          }
        });
        console.log(x1);
        console.log(y1);
      });
  }


  query2 = () => {
    var x = [];
    var years = [];
    var names=[];
    var dict = {};
    fetch("http://localhost:4000/query2")
      .then(data => data.json())
      .then(res => {
        for (var y = 2008; y <= 2016; y++) {

          dict[y] = {};
          for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].teams.length; j++) {
              dict[y][res[i].teams[j].winner] = 0;
              
            }
          }
        
        for ( i = 0; i < res.length; i++) {
          years[i]=y;
          for (j = 0; j < res[i].teams.length; j++) {
            if(y===res[i]._id)
            dict[y][res[i].teams[j].winner] = res[i].teams[j].count;

          }
        }
      }
      var y2008=[],y2016=[],y2017=[];
      var y2009=[],y2010=[],y2011=[],y2012=[],y2013=[],y2014=[],y2015=[];
      for(i=0;i<res[0].teams.length;i++)
      {
        names[i]=res[0].teams[i].winner;
        y2008[i]=dict[2008][res[0].teams[i].winner];
        y2009[i]=dict[2009][res[0].teams[i].winner];
        y2010[i]=dict[2010][res[0].teams[i].winner];
        y2011[i]=dict[2011][res[0].teams[i].winner];
        y2012[i]=dict[2012][res[0].teams[i].winner];
        y2013[i]=dict[2013][res[0].teams[i].winner];
        y2014[i]=dict[2014][res[0].teams[i].winner];
        y2015[i]=dict[2015][res[0].teams[i].winner];
        y2016[i]=dict[2016][res[0].teams[i].winner];
      } 
      console.log(dict);

        this.setState({
          Data2: {
            labels: names,
            datasets: [
              {
                  label: '2008',
                  data: y2008,
                  backgroundColor: "rgba(55, 160, 225, 0.7)",
                  hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                  hoverBorderWidth: 2,
                  hoverBorderColor: 'lightgrey'
              },
              {
                  label: '2009',
                  data: y2009,
                  backgroundColor: "rgba(225, 58, 55, 0.7)",
                  hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
                  hoverBorderWidth: 2,
                  hoverBorderColor: 'lightgrey'
              },
              {
                label: '2010',
                data: y2010,
                backgroundColor: "rgba(55, 160, 225, 0.7)",
                hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
                label: '2011',
                data: y2011,
                backgroundColor: "rgba(225, 58, 55, 0.7)",
                hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            },
            {
              label: '2012',
              data: y2012,
              backgroundColor: "rgba(55, 160, 225, 0.7)",
              hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
              hoverBorderWidth: 2,
              hoverBorderColor: 'lightgrey'
          },
          {
              label: '2013',
              data: y2013,
              backgroundColor: "rgba(225, 58, 55, 0.7)",
              hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
              hoverBorderWidth: 2,
              hoverBorderColor: 'lightgrey'
          },
          {
            label: '2014',
            data: y2014,
            backgroundColor: "rgba(55, 160, 225, 0.7)",
            hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: 'lightgrey'
        },
        {
            label: '2015',
            data: y2015,
            backgroundColor: "rgba(225, 58, 55, 0.7)",
            hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: 'lightgrey'
        },
        {
          label: '2016',
          data: y2016,
          backgroundColor: "rgba(55, 160, 225, 0.7)",
          hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
      }

              ]
          }
        });
   
        
      });
  };

  query3 = () => {
    var x3 = [];
    var y3 = [];
    fetch("http://localhost:4000/query3")
      .then(data => data.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          x3.push(res[i]._id.batting_team);
          y3.push(res[i].count);
        }
        this.setState({
          Data3: {
            labels: x3,
            datasets: [{
              label: "extra runs",
              data: y3,
              backgroundColor: [
                "rgba(255, 0, 0)",
                "rgba(0, 0, 235)",
                "rgba(0, 255, 0)",
                "rgba(255, 255, 0)",
                "rgba(255, 0, 235)",
                "rgba(0, 25, 255)",
                "rgba(0, 55, 0)",
                "rgba(255, 0, 255)",
                "rgba(25, 0, 235)",
                "rgba(0, 0, 0)"
              ]

            }]
          }
        });
        console.log(x3);
        console.log(y3);
      });
  };

  query4 = () => {
    var x4 = [];
    var y4 = [];
    var bowler = [];
    var runs = [];
    var balls = [];
    var econ = [];
    var arr = [];
    var dict = {};
    fetch("http://localhost:4000/query4")
      .then(data => data.json())
      .then(res => {
        res.sort();
        for (var i = 0; i < res.length; i++) {
          bowler[i] = res[i]._id.bowler;

          runs[i] = Number(res[i].num);
          balls[i] = Number(res[i].den);
          econ[i] = Number((runs[i] / balls[i]) * 6);
          dict[bowler[i]] = econ[i];

          arr[i] = [econ[i], bowler[i]].join("");
        }

        econ.sort(function (a, b) {
          return a - b
        });
        console.log(arr);
        for (i = 0; i < 5; i++) {
          y4[i] = econ[i];

        }
        for (i = 0; i < 5; i++) {
          for (var j = 0; j < res.length; j++) {
            if (y4[i] === dict[bowler[j]]) {
              x4[i] = bowler[j];

            }
          }

        }
        console.log(x4);
        console.log(y4);
        this.setState({
          Data4: {
            labels: x4,
            datasets: [{
              label: "economy",
              data: y4,
              backgroundColor: [
                "rgba(255, 0, 0)",
                "rgba(0, 0, 235)",
                "rgba(0, 255, 0)",
                "rgba(255, 255, 0)",
                "rgba(255, 0, 235)",
                "rgba(0, 25, 255)",
                "rgba(0, 55, 0)",
                "rgba(255, 0, 255)",
                "rgba(25, 0, 235)",
                "rgba(0, 0, 0)"
              ]

            }]
          }
        });
      });
  };

  query5 = () => {
    var x5 = [];
    var y5 = [];
    fetch("http://localhost:4000/query5")
      .then(data => data.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          x5.push(res[i]._id.winner);
          y5.push(res[i].count);
        }
        this.setState({
          Data5: {
            labels: x5,
            datasets: [{
              label: "Matches won",
              data: y5,
              backgroundColor: [
                "rgba(255, 0, 0)",
                "rgba(0, 0, 235)",
                "rgba(0, 255, 0)",
                "rgba(255, 255, 0)",
                "rgba(255, 0, 235)",
                "rgba(0, 25, 255)",
                "rgba(0, 55, 0)",
                "rgba(255, 0, 255)",
                "rgba(255, 0, 235)",
                "rgba(25, 0, 235)",
                "rgba(0, 255, 0)",
                "rgba(255, 255, 0)",
                "rgba(255, 0, 235)",
                "rgba(0, 0, 0)"
              ]

            }]
          }
        });
        console.log(x5);
        console.log(y5);
      });
  };


  render() {

    return (

      <div className = "App" >

      <
      Bar data = {
        this.state.Data
      }
      options = {
        {
          title: {
            display: true,
            text: "Matches played per year",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          }
        }
      }
      /> <
      Bar data = {
        this.state.Data2
      }
      options = {
        {
          title: {
            display: true,
            text: "Matches won per year  year by each team",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          },
          scales: {
          xAxes: [{ 
          	stacked: true, 
      
            }],
          yAxes: [{ 
          	stacked: true
            
            }]
          }
        }
      }
      />

      <
      Bar data = {
        this.state.Data3
      }
      options = {
        {
          title: {
            display: true,
            text: "extra runs by each team",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          }
        }
      }
      />


      <
      Bar data = {
        this.state.Data4
      }
      options = {
        {
          title: {
            display: true,
            text: "economy bowlers",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          }
        }
      }
      /> <
      Bar data = {
        this.state.Data5
      }
      options = {
        {
          title: {
            display: true,
            text: "won toss along with the match",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          }
        }
      }
      />

      </div>

    );
  }
}

export default App;