import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
    Fab,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TodayIcon from '@material-ui/icons/Today';
import Layout from '../Layout';
import TotalTime from './TotalTime';
import { getDashboardData } from '../../lib/helpers/dashboard-helpers';
import CategoryBreakdown from './CategoryBreakdown';
import TopSites from './TopSites';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    marginRight: {
      margin: theme.spacing(1),
    },
  }));

const DashboardV2 = () => {
    const classes = useStyles();

    const [data, setData] = useState(getDashboardData());
    const [current, setCurrent ] = useState(data.length - 1);

    console.log('dashboard v2', data);

    const changeDay = (direction) => {
        direction === 'previous' ? setCurrent(current - 1) : setCurrent(current + 1);
    }

    return (
        <Layout>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
          >
            <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
                <Fab
                  color="primary"
                  size="small"
                  aria-label="add"
                  disabled={current === 0}
                  onClick={() => changeDay('previous')}
                  className={classes.margin}
                >
                  <ArrowBackIcon />
                </Fab>
                  <TodayIcon className={classes.marginRight} />
                  <Typography variant="h3">{dayjs(data[current].date).format('dddd, MMMM D, YYYY')}</Typography>
                <Fab
                  color="primary" 
                  size="small"
                  aria-label="add"
                  disabled={current === data.length - 1}
                  onClick={() => changeDay('next')}
                  className={classes.margin}
                >
                  <ArrowForwardIcon />
                </Fab>
            </Grid>
            <Grid item xs={3}>
              <TotalTime total={data[current].total} />
            </Grid>
            <Grid item xs={3}>
              <CategoryBreakdown categories={data[current].categories} />
            </Grid>
            <Grid item xs={3}>
              <TopSites sites={data[current].sites} />
            </Grid>
          </Grid>
        </Layout>
      );
    };
    
export default DashboardV2;
