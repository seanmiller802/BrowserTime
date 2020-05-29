import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const TopSitesSkeleton = () => (
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
);

export default TopSitesSkeleton;
