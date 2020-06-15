import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {
  ValueScale,
  Stack,
  Animation,
  HoverState,
  EventTracker,
} from '@devexpress/dx-react-chart';
import { connectProps } from '@devexpress/dx-react-core';
import { format } from 'd3-format';
import { getDayOfWeek, getLastSevenDays } from '../../../lib/helpers/day-helpers';
import categoryMappings from '../../../lib/mappings/categoryMappings';

const Label = () => (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={text}
    />
  );
};

const makeLabel = (symbol) => ({ text, style, ...restProps }) => (
  <ValueAxis.Label
    text={`${text} ${symbol}`}
    style={{
      ...style,
    }}
    {...restProps}
  />
);

const legendRootStyle = {
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
};

const LegendRoot = (props) => <Legend.Root {...props} style={legendRootStyle} />;

const legendItemStyle = {
  flexDirection: 'column',
  marginLeft: '-2px',
  marginRight: '-2px',
};
const LegendItem = (props) => (
  <Legend.Item {...props} style={legendItemStyle} />
);

const legendLabelStyle = {
  whiteSpace: 'nowrap',
};
const LegendLabel = (props) => (
  <Legend.Label {...props} style={legendLabelStyle} />
);

const TooltipContent = ({
  data, text, style, ...props
}) => {
  console.log('tooltip data', data);
  const alignStyle = {
    ...style,
    paddingLeft: '10px',
  };
  const items = data.history.map((item) => {
    const val = item.category;
    let percentage = format('.0%')(item.items.length / data.count);
    if (percentage === '0%') percentage = "< 1%"
    return (
      <tr key={val}>
        <td>
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" />
          </svg>
        </td>
        <td>
          <Tooltip.Content style={alignStyle} text={val} {...props} />
        </td>
        {/* <td align="right">
          <Tooltip.Content style={alignStyle} text={item.items.length} {...props} />
        </td> */}
        <td align="right">
          <Tooltip.Content style={alignStyle} text={percentage} {...props} />
        </td>
      </tr>
    );
  });
  return (
    <table>
      {items}
    </table>
  );
};

const WeeklyUsageChart = ({ history }) => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [foundCategories, setFoundCategories] = useState([]);

  const HistoryLabel = Label();
  const PercentageLabel = makeLabel('%');

  const CustomTooltip = connectProps(TooltipContent, () => {
    return { data: currentTarget ? history[currentTarget.point] : null };
  });

  const modifyHistoryDomain = (domain) => [domain[0], 600];
  const modifyPercentageDomain = () => [0, 100];

  const getCategoryCounts = (items) => {
    const counts = {};
    items.forEach((item) => {
      counts[item.category] = item.items.length;
      if (!foundCategories.includes(item.category)) {
        setFoundCategories([...foundCategories, item.category]);
      }
    });
    return counts;
  };

  const getChartData = () => {
    const labels = getLastSevenDays();
    const historyDays = [];
    history.forEach((day) => {
      historyDays.push(getDayOfWeek(day.date));
    });
    const data = [];
    let i = 0;
    let y = 0;
    while (i < labels.length) {
      if (labels[i] === historyDays[y]) {
        const categoryCounts = getCategoryCounts(history[y].history);
        data.push({
          day: getDayOfWeek(history[y].date),
          ...categoryCounts,
        });
        y += 1;
      } else {
        data.push({
          day: labels[i],
          News: 0,
        });
      }
      i += 1;
    }
    console.log('data issssss', data);
    return data.reverse();
  };

  const handleChangeHover = (target) => {
    setCurrentTarget(target ? { series: target.series, point: target.point } : null);
  };

  const stacks = [{
    series: categoryMappings
      .filter((obj) => foundCategories.includes(obj.key))
      .map((obj) => obj.name),
  }];

  return (
    <Paper>
      <Chart
        data={getChartData()}
      >
        <ValueScale name="history" modifyDomain={modifyHistoryDomain} />
        <ValueScale name="percentage" modifyDomain={modifyPercentageDomain} />
        <ArgumentAxis />
        <ValueAxis
          scaleName="history"
          labelComponent={HistoryLabel}
        />
        <ValueAxis
          scaleName="percentage"
          position="right"
          labelComponent={PercentageLabel}
        />
        {categoryMappings.filter((obj) => foundCategories.includes(obj.key)).map((category) => (
          <BarSeries
            name={category.name}
            valueField={category.key}
            argumentField="day"
            scaleName="history"
          />
        ))}
        <Title text="8% increase over last week" />
        <Animation />
        <Legend
          position="bottom"
          rootComponent={LegendRoot}
          itemComponent={LegendItem}
          labelComponent={LegendLabel}
        />
        <Stack stacks={stacks} />
        <EventTracker />
        <HoverState
          hover={currentTarget}
          onHoverChange={handleChangeHover}
        />
        <Tooltip
          targetItem={currentTarget}
          contentComponent={CustomTooltip}
        />
      </Chart>
    </Paper>
  );
};

WeeklyUsageChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default WeeklyUsageChart;
