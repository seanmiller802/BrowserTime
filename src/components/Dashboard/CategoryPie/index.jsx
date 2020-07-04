import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import {
  Chart,
  PieSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { connectProps } from '@devexpress/dx-react-core';
import categoryMappings from '../../../lib/mappings/categoryMappings';

// BUG - colors from the props are not correct so manually setting for now
const Slice = ({ color, argument, ...props }) => (
  <PieSeries.Point color={categoryMappings.find((i) => i.key === argument).color} {...props} />
);

Slice.propTypes = {
  color: PropTypes.string.isRequired,
  argument: PropTypes.string.isRequired,
};

const TooltipContent = ({
  data,
}) => <Typography variant="h4">{`${data.percent} ${data.name}`}</Typography>;

TooltipContent.propTypes = {
  data: PropTypes.shape({
    percent: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const CategoryPie = ({ data }) => {
  const [currentTarget, setCurrentTarget] = useState(null);

  // eslint-disable-next-line max-len
  const CustomTooltip = connectProps(TooltipContent, () => ({ data: currentTarget ? data[currentTarget.point] : null }));

  const handleChangeHover = (target) => {
    setCurrentTarget(target ? { ...target } : null);
  };

  return (
    <Card>
      <CardHeader title="Category breakdown" />
      <CardContent>
        {data.length < 1 ? (
          <Typography variant="h4" component="h2">NA</Typography>
        ) : (
          <>
            <Chart data={data} height={350}>
              <PieSeries
                valueField="val"
                argumentField="category"
                innerRadius={0.3}
                outerRadius={0.8}
                pointComponent={Slice}
              />
              <Animation />
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
            {data.map((i) => {
              const { name, color } = categoryMappings.find((a) => a.key === i.category);
              return (
                <Typography align="left">
                  <svg width="10" height="10" style={{ marginRight: 5 }}>
                    <circle cx="5" cy="5" r="5" fill={color} />
                  </svg>
                  {name}
                  {' '}
                  -
                  {' '}
                  {i.percent}
                </Typography>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};

CategoryPie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CategoryPie;
