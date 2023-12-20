import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import dayjs from "dayjs";


export default function TransactionChart({ data }) {
    const chartData = data.map((item) => {
        item.month = dayjs()
            .month(item._id - 1)
            .format("MMMM");
        return item;
    }).sort((a, b) => a._id - b._id);
    
    
    return (
        <Paper sx={{ marginTop: 10 }}>
            <Chart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                padding={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                    valueField="totalExpenses"
                    argumentField="month"
                />
                <Title text="Expenses by Month" />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        </Paper>
    );
}


