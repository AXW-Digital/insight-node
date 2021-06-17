import React, { Component } from 'react';
import HomeLeaderChart from '../charts/HomeLeaderChart';
import axios from 'axios';
import Loader from '../parts/Loader';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isUpdated: false,
            data: [],
            categories: [],
            fullData: [],
            series: []
        }
    }

    componentDidMount() {

        if (this.state.isLoaded === false) {
            axios
                .get("../api/data/activity")
                .then((response) => {
                    this.setState({
                        isLoaded: true,
                        data: response.data,
                        series: [{ data: response.data.profiles.points }]
                    });

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        isLoaded: true,
                        data: []
                    });
                });

        }
    }





    render() {

        const { isLoaded, data, isUpdated } = this.state
        var ser = null

        function sortJSON(arr, key, way) {
            return arr.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
                if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
            });
        }
        

        if (isLoaded && data.length !== 0 && isUpdated === false) {

            var json1 = data.surveys
            var json2 = data.profiles

            let json3 = [];

            json1.forEach((j1) => {
                json2.forEach((j2) => {
                    if (j1._user === j2._user) {
                        json3.push({ ...j1, ...j2 });
                    }
                });
            });


            ser = json2.map(o => ({ x: o.fName, y: o.points }))
            ser = sortJSON(ser, 'y', '321');
            console.log(ser);
            this.setState({
                fullData: ser,
                isUpdated: true,
            });

            return ( <Loader />)
            
        } else if (isUpdated) {
            return (
                <div className = 'leaderboard-chart'>
                    <HomeLeaderChart data = {this.state.fullData}/>
                </div>
            );    
        } else {
            return ( <Loader />)
        }

        
    }
}

export default LeaderBoard;