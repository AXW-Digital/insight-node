import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../parts/Loader';
import LeaderBoardTb from '../charts/LeaderBoardTable';

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
                        series: response.data.points
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


            ser = this.state.data.map(o => ({ 
                x: o.uName, 
                y: o.points, 
                avatar: o.avatar, 
                surveyCount: o.surveyCount,
                totalQuestions: o.totalQuestions 
            }))
            ser = sortJSON(ser, 'y', '321');
            ser = ser.map(o => ({ 
                uName: o.x, 
                points: o.y, 
                avatar: o.avatar, 
                surveyCount: o.surveyCount,
                totalQuestions: o.totalQuestions 
            }))

            this.setState({
                fullData: ser,
                isUpdated: true,
            });

            return ( <Loader />)
            
        } else if (isUpdated) {
            return (
                <div className = 'leaderboard-chart container'>
                    <LeaderBoardTb data = {this.state.fullData}/>
                </div>
            );    
        } else {
            return ( <Loader />)
        }

        
    }
}

export default LeaderBoard;