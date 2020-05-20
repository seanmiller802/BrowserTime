import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../Layout';
import TodaysTopSite from './TodaysTopSite';
import TodaysTotalVisits from './TodaysTotalVisits';
import TodaysTopCategory from './TodaysTopCategory';
import EstimatedTimeBrowsing from './EstimatedTimeBrowsing';
import TopSitesCard from './TopSitesCard';
import { prepareSearchObject, searchHistory } from '../../lib/chrome-helpers';
import { groupHistoryByDate } from '../../lib/history-helpers';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const searchParams = prepareSearchObject('', 'Seven', {}, 10000);
    searchHistory(searchParams)
      .then((results) => {
        const sortedHistory = groupHistoryByDate(results);
        setHistory(sortedHistory);
      })
      .catch((error) => console.error('Error getting history', error));
  }, []);

  // return total history items for today
  // if history from yesterday, include that
  const getTotalPageVisits = () => {
    let yesterday;
    const today = history[0].items.length;
    if (history.length > 1) {
      yesterday = history[1].items.length;
    }
    return { today, yesterday };
  };

  const hasHistory = history.length > 0;

  return (
    <Layout>
      {hasHistory && (
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
        >
          <Grid item xs={3}>
            <TodaysTopSite />
          </Grid>
          <Grid item xs={3}>
            <TodaysTotalVisits getTotalPageVisits={getTotalPageVisits} />
          </Grid>
          <Grid item xs={3}>
            <TodaysTopCategory />
          </Grid>
          <Grid item xs={3}>
            <EstimatedTimeBrowsing />
          </Grid>
          <Grid item xs={3}>
            <TopSitesCard />
          </Grid>
          <Grid item xs={9}>
            <TopSitesCard />
          </Grid>
        </Grid>
      )}
      {!hasHistory && <div>fucking loading</div>}
    </Layout>
  );
};

export default Dashboard;
