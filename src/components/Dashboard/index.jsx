import React, { useEffect, useState } from 'react';
import {
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import Layout from '../Layout';
import TodaysTopSite from './TodaysTopSite';
import TodaysTotalVisits from './TodaysTotalVisits';
import TodaysTopCategory from './TodaysTopCategory';
import EstimatedTimeBrowsing from './EstimatedTimeBrowsing';
import TopSitesCard from './TopSitesCard';
import WeeklyUsageCard from './WeeklyUsageCard';
import SkeletonCardSmall from './SkeletonCardSmall';
import TopSitesSkeleton from './TopSitesSkeleton';
import { getSearchParams, searchHistory } from '../../lib/helpers/chrome-helpers';
import { groupHistoryByDate, enrichHistory } from '../../lib/helpers/history-helpers';
import { isToday } from '../../lib/helpers/day-helpers';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const getToday = () => {
    if (history.length < 1 || !isToday(history[0].date)) {
      return {
        site: 'NA',
        category: 'NA',
        visits: 'NA',
      };
    }

    return {
      site: history[0].topSite,
      category: history[0].topCategory,
      visits: history[0].count,
    };
  };

  useEffect(() => {
    const searchParams = getSearchParams('', 'Seven', {}, 10000);
    searchHistory(searchParams)
      .then(async (results) => {
        const groupedHistory = groupHistoryByDate(results);
        const enrichedHistory = enrichHistory(groupedHistory);
        console.log('DASHBOARD enhancedHistory', enrichedHistory);
        setHistory(enrichedHistory);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error getting history', error)); // HANDLE THIS
  }, []);

  return (
    <Layout>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
      >
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={() => {}}>
              Insights
            </Link>
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
          <Typography variant="h3" gutterBottom>Welcome back!</Typography>
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall /> : <TodaysTopSite value={getToday().site} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall /> : <TodaysTotalVisits value={getToday().visits} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall /> : <TodaysTopCategory value={getToday().category} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall /> : <EstimatedTimeBrowsing />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <TopSitesSkeleton /> : <TopSitesCard />}
        </Grid>
        <Grid item xs={9}>
          {isLoading ? <TopSitesSkeleton /> : <WeeklyUsageCard history={history} />}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
