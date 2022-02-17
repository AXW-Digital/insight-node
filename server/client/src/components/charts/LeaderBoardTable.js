import React, { Component } from 'react'

import ReactTable from "react-table-6";
import ReactTooltip from "react-tooltip";
import "react-table-6/react-table.css";
import Avatar from '../parts/Avatar';
import { levelThresholds } from '../../functions/getLevel';
import { Progress } from 'antd';
import ProgressCircleInChart from './ProgressCircleInChart';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';



export default class LeaderBoardTb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        uName: 'Loading',
        score: 5,
        avatar: 1234,
        level: 5
      }],
      intl: createIntl({
        locale: 'fi-FI',
        messages: {}
      })
    }
  };

  componentDidMount() {


    var levels = levelThresholds
    var level = 0;
    var inputData = [];
    var levelNow = 0;
    var levelNext = 0;
    var progress = 0;

    function getLevel(data) {
      var points = data.points
      levels.forEach((v, i) => {
        if (points >= v) {
          level = i + 1;
        }
      });
      return level;
    }

    function getProgress(data) {
      var points = data.points
      levels.forEach((v, i) => {
        if (points >= v) {
          levelNow = i;
        }
      });
      levelNext = levelNow + 1
      progress = 1 - (levels[levelNext] - points) / levels[levelNext]
      return progress
    }

    var allLevels = this.props.data.forEach(e => {
      level = getLevel(e)
      progress = getProgress(e)
      var {
        uName,
        points,
        avatar,
        surveyCount,
        totalQuestions
      } = e
      inputData.push({
        uName,
        points,
        avatar,
        level,
        progress,
        surveyCount,
        totalQuestions
      })
    })
    console.log(inputData)

    const intl = createIntl({
      locale: 'fi-FI',
      messages: {}
    })


    this.setState({
      data: inputData,
      intl
    })

  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }


  render() {
    const { data, intl } = this.state;



    return (
      <>
        <div className='mb-5'>
          {/* Add  ReactTooltip in the Cell only */}
          <ReactTooltip place="left" type="success" effect="solid" />
          <ReactTable
            data={data}
            style={{ borderRadius: "10px !important", textAlign: 'center' }}
            columns={[
              {
                Header: "User",
                columns: [
                  {
                    Header: "Avatar",
                    accessor: "avatar",
                    Cell: (row) => {
                      /* Add data-tip */
                      return <Avatar avatarSeed={row.value} />;
                    }
                  },
                  {
                    Header: "User Name",
                    id: "uName",
                    accessor: (d) => d.uName,
                    Cell: (row) => {
                      /* Add data-tip */
                      return <span data-tip={row.value}>{row.value}</span>;
                    }
                  }
                ]
              },
              {
                Header: "Stats",
                columns: [
                  {
                    Header: "Points",
                    accessor: "points",
                    Cell: (row) => {
                      /* Add data-tip */
                      return <span data-tip={intl.formatNumber(row.value)}>
                        <strong>
                          {intl.formatNumber(row.value)}
                        </strong>
                      </span>;
                    }
                  },
                  {
                    Header: "Level",
                    accessor: "level",
                    Cell: (row) => {
                      /* Add data-tip */
                      return (
                        <div data-tip={intl.formatNumber(row.original.progress, { style: 'percent', maximumFractionDigits: 0 })}>
                          <ProgressCircleInChart
                            level={row.value}
                            progress={row.original.progress}
                          />
                        </div>
                      );
                    }
                  },
                  {
                    Header: "Surveys",
                    accessor: "surveyCount",
                    Cell: (row) => {
                      /* Add data-tip */
                      return <span data-tip={row.value}>{row.value}</span>;
                    }
                  },
                  {
                    Header: "Questions",
                    accessor: "totalQuestions",
                    Cell: (row) => {
                      /* Add data-tip */
                      return <span data-tip={row.value}>{row.value}</span>;
                    }
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            onPageSizeChange={() => {
              ReactTooltip.rebuild();
            }}
            className="-highlight"
          />
          <br />
        </div>
      </>
    );
  }
}

