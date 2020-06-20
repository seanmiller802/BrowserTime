import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
  Legend,
  Tooltip,
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
    const fillColor = categoryMappings.find((category) => category.key === val).color;
    let percentage = format('.0%')(item.items.length / data.count);
    if (percentage === '0%') percentage = '< 1%';
    return (
      <tr key={val}>
        <td>
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill={fillColor} />
          </svg>
        </td>
        <td>
          <Tooltip.Content style={alignStyle} text={val} {...props} />
        </td>
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

  const maxCount = Math.max(...history.map((day) => day.count), null);

  // eslint-disable-next-line max-len
  const CustomTooltip = connectProps(TooltipContent, () => ({ data: currentTarget ? history[currentTarget.point] : null }));

  const modifyHistoryDomain = (domain) => [domain[0], maxCount + 10];

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
    return data;
  };

  const handleChangeHover = (target) => {
    setCurrentTarget(target ? { series: target.series, point: target.point } : null);
  };

  const getStacks = () => {
    return [{
      series: categoryMappings
        .filter((obj) => foundCategories.includes(obj.key))
        .map((obj) => obj.name),
    }];
  };

  return (
    <Chart
      data={getChartData()}
    >
      <ValueScale name="history" modifyDomain={modifyHistoryDomain} />
      <ArgumentAxis />
      <ValueAxis scaleName="history" labelComponent={HistoryLabel} />
      {categoryMappings.filter((obj) => foundCategories.includes(obj.key))
        .map(({ name, key, color }) => (
          <BarSeries
            name={name}
            valueField={key}
            argumentField="day"
            scaleName="history"
            color={color}
          />
        ))}
      <Animation />
      <Legend
        position="bottom"
        rootComponent={LegendRoot}
        itemComponent={LegendItem}
        labelComponent={LegendLabel}
      />
      <Stack stacks={getStacks()} />
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
  );
};

WeeklyUsageChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default WeeklyUsageChart;
