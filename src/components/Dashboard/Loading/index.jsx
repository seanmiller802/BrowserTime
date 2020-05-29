import React from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const Loading = () => (
  <>
    {[...Array(4)].map(() => (
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
            </Typography>
            <Typography variant="h4" component="h2">
              <Skeleton animation="wave" height={20} style={{ marginBottom: 3 }} />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
    <Grid item xs={3}>
      <Card>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
          title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <CardContent>
          {[...Array(10)].map(() => (
            <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
          ))}
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={9}>
      <Card>
        <CardHeader
          title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <CardContent>
          {[...Array(10)].map(() => (
            <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
          ))}
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default Loading;
