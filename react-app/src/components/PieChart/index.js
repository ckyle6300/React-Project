import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const PieChart = ({ allInfo, total, cash }) => {
  console.log(total)
  const data = allInfo.map(crypto => {
    const percent = Number((((crypto.current_price * crypto.num_of_shares) / total) * 100).toLocaleString())
    return {
      name: crypto.name,
      area: percent
    }
  })

  data.push({ name: "cash", area: Number(((cash / total) * 100).toLocaleString()) })


  return (
    <Paper>
      <Chart
        data={data}
      >
        <PieSeries
          valueField="area"
          argumentField="name"
        >
        </PieSeries>
        <Title
          text="Portfolio"
        />
        {/* <Legend
          // labelComponent={data}
        /> */}
        <Animation />
      </Chart>
    </Paper>
  )
}

export default PieChart