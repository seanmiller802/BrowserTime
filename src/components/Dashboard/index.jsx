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
import SkeletonCardSmall from './SkeletonCardSmall';
import TopSitesSkeleton from './TopSitesSkeleton';
import { getSearchParams, searchHistory } from '../../lib/helpers/chrome-helpers';
import { groupHistoryByDate, enrichHistory } from '../../lib/helpers/history-helpers';

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
            mostVisited: 'NA',
            topCategory: 'NA',
            totalUniqueSites: 'NA',
            percentChange: 'NA',
          });
        } else {
          const groupedHistory = groupHistoryByDate(results);
          const enrichedHistory = enrichHistory(groupedHistory);
          console.log('enriched', enrichedHistory);
          setHistory(enrichedHistory);
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
          {isLoading ? <TopSitesSkeleton /> : <TopSitesCard />}
        </Grid>
        <Grid item xs={9}>
          {isLoading ? <TopSitesSkeleton /> : <WeeklyUsageCard history={history.data} />}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
