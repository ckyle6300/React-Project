import React, { useState } from 'react';
import Highcharts, { chart } from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Tooltip, Legend, LineSeries
} from 'react-jsx-highcharts';
import './index.css'; // CSS Styles
import { useDispatch, useSelector } from 'react-redux';




const App = () => {
  //original data had a binary date. Needed to change it to an actual date so the x axis would show the day's array.
  const chartData = useSelector(state => state.history)
  const actual = []
  const volume = []

  const Days = [
    '30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'
  ];

  for (let i = 0; i < chartData?.prices?.length; i++) {
    let priceArr = chartData.prices[i];
    for (let j = 0; j < priceArr.length; j++) {
      if (j == 0) {
        let timestamp = priceArr.shift();
        let date = new Date(timestamp);
        priceArr.unshift(date);
        actual.push(priceArr)
      }
    }
  }

  for (let i = 0; i < chartData?.total_volumes?.length; i++) {
    let priceArr = chartData.total_volumes[i];
    for (let j = 0; j < priceArr.length; j++) {
      if (j == 0) {
        let timestamp = priceArr.shift();
        let date = new Date(timestamp);
        priceArr.unshift(date);
        volume.push(priceArr)
      }
    }
  }

  return (

    <div className="app">
      <HighchartsChart styledMode>
        <Chart />

        <Title>Historical Price</Title>

        <Subtitle>Source: www.coingecko.com/en/api</Subtitle>

        <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

        <Tooltip valueSuffix=" $" shared />

        <XAxis categories={Days}>
          <XAxis.Title>Days From Present</XAxis.Title>
        </XAxis>

        <YAxis>
          <YAxis.Title>Price($)</YAxis.Title>
          <LineSeries name="PRICE" data={chartData.prices} />
          <LineSeries name="VOLUME" data={chartData.total_volumes} />
        </YAxis>
      </HighchartsChart>

    </div>
  );
}
export default withHighcharts(App, Highcharts);