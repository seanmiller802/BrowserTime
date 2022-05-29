import React, { useEffect, useState } from 'react';
import {
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import Layout from '../Layout';
import MostVisitedSite from './MostVisitedSite';
import TotalUniqueSites from './TotalUniqueSites';
import TopCategory from './TopCategory';
import EstimatedTimeBrowsing from './PercentChange';
import TopSitesCard from './TopSitesCard';
import WeeklyUsageCard from './WeeklyUsageCard';
import CategoryPie from './CategoryPie';
import SkeletonCardSmall from './SkeletonCardSmall';
import TopSitesSkeleton from './TopSitesSkeleton';
import { getSearchParams, searchHistory } from '../../lib/helpers/chrome-helpers';
import { groupHistoryByDate, groupHistoryByHour, enrichHistory } from '../../lib/helpers/history-helpers';
import { groupSessionsByDate } from '../../lib/helpers/dashboard-helpers';

const sessions = {
  'wsj.com': { sessions: [{ start: 1608955631135, end: 1608956631135 }, { start: 1609024093220, end: 1609026093220 }, { start: 1609130641566, end: 1609130841566 }, { start: 1609130641568, end: 1609130851566 }] },
  'duckduckgo.com': { sessions: [{ start: 1608955631134, end: 1608956631136 }, { start: 1609024093221, end: 1609026093221 }, { start: 1609130641567, end: 1609130841567 } ] },
  'github.com': { sessions: [{ start: 1608955631133, end: 1608956631137 }, { start: 1609024093222, end: 1609026093222 }, { start: 1609130641568, end: 1609130841568 }] }
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState({});

  useEffect(() => {
    const searchParams = getSearchParams('', 'Fourteen', {}, 10000);
    searchHistory(searchParams)
      .then(async (results) => {
        if (results.length < 1) {
          setHistory({
            data: [],
            timeData: [],
            mostVisited: 'NA',
            topCategory: 'NA',
            totalUniqueSites: 'NA',
            percentChange: 'NA',
            categoryBreakdown: [],
          });
        } else {
          const groupedByDate = groupHistoryByDate(results);
          console.log('grouped by date', groupedByDate);
          const groupedByHour = groupHistoryByHour(results);
          const enrichedHistory = enrichHistory(groupedByDate);
          console.log(';resdsgt', groupSessionsByDate(sessions));
          setHistory({ ...enrichedHistory, timeData: groupedByHour });
        }
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
          <Breadcrumbs aria-label="breadcrumb" gutterBottom>
            <Link color="inherit" href="/" onClick={() => {}}>
              Insights
            </Link>
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
          <Typography variant="h3">This week&#39;s overview</Typography>
        </Grid>
        <Grid item xs={3}>
          { isLoading ? <SkeletonCardSmall /> : <MostVisitedSite value={history.mostVisited} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall />
            : <TotalUniqueSites value={history.totalUniqueSites} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall /> : <TopCategory value={history.topCategory} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <SkeletonCardSmall />
            : <EstimatedTimeBrowsing value={history.percentChange} />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <TopSitesSkeleton /> : <CategoryPie data={history.categoryBreakdown} />}
        </Grid>
        <Grid item xs={9}>
          {isLoading ? <TopSitesSkeleton /> : <WeeklyUsageCard data={history.data} title="Last 7 days by category" chartType="category" />}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <TopSitesSkeleton /> : <TopSitesCard />}
        </Grid>
        <Grid item xs={9}>
          {isLoading ? <TopSitesSkeleton /> : <WeeklyUsageCard data={history.timeData} title="Last 7 days by hour" chartType="time" />}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
