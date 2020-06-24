import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Favicon from '../../Favicon';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const TopSite = ({ title, url, handleClick }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title} placement="bottom" arrow aria-label="top sites">
      <ListItem>
        <Favicon url={url} />
        <Typography noWrap onClick={() => handleClick(url)} className={classes.title}>
          {title}
        </Typography>
      </ListItem>
    </Tooltip>
  );
};

TopSite.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const TopSitesCard = () => {
  const [topSites, setTopSites] = useState([]);

  const handleClick = (url) => {
    window.open(url);
  };

  useEffect(() => {
    chrome.topSites.get((items) => setTopSites(items));
  });

  return (
    <Card raised="true">
      <CardHeader
        title="Top Sites (All time)"
      />
      <CardContent>
        {topSites.length < 1 ? (
          <Typography variant="h4" component="span">NA</Typography>
        ) : (
          <List>
            {topSites.map((site) => (
              <TopSite title={site.title} url={site.url} handleClick={handleClick} />
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default TopSitesCard;
