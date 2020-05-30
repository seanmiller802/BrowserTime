import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import WeeklyUsageChart from '../WeeklyUsageChart';
import TopSitesSkeleton from '../TopSitesSkeleton';
import { getLastSevenDays, getDayOfWeek } from '../../../lib/day-helpers';
import { ThemeContext } from '../../../context/ThemeContext';

const WeeklyUsageCard = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({});
  const currentTheme = useContext(ThemeContext);
  const primary = currentTheme.palette.primary.main;

  // fill in last seven days of activity
  const getChartData = (historyData) => {
    const labels = getLastSevenDays();
    const historyDays = [];
    historyData.forEach((day) => {
      historyDays.push(getDayOfWeek(day.date));
    });
    const data = [];
    let i = 0;
    let y = 0;
    while (i < labels.length) {
      if (labels[i] === historyDays[y]) {
        data.push(historyData[y].items.length);
        y += 1;
      } else {
        data.push(0);
      }
      i += 1;
    }
    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: 'History Items',
          data: data.reverse(),
          backgroundColor: primary,
          hoverBackgroundColor: primary,
        },
      ],
    };
  };

  useEffect(() => {
    setIsLoading(true);
    const d = getChartData(history);
    setChartData(d);
    setIsLoading(false);
  }, [history]);

  return isLoading ? (
    <TopSitesSkeleton />
  ) : (
    <Card raised="true">
      <CardHeader
        title="Usage over last 7 days"
      />
      <CardContent>
        <WeeklyUsageChart data={chartData} />
      </CardContent>
    </Card>
  );
};

WeeklyUsageCard.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default WeeklyUsageCard;
