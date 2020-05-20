import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

const TopSite = ({ title, url }) => (
  <Tooltip title={title} placement="bottom" arrow aria-label="top sites">
    <ListItem>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <Typography noWrap>
        {title}
      </Typography>
    </ListItem>
  </Tooltip>
);

TopSite.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const TopSitesCard = () => {
  const [topSites, setTopSites] = useState([]);

  useEffect(() => {
    chrome.topSites.get((items) => setTopSites(items));
  });

  return (
    <div>
      <Card raised="true">
        <CardHeader
          title="Top Sites (All Time)"
        />
        <CardContent>
          <List>
            {topSites.map((site) => <TopSite title={site.title} />)}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopSitesCard;
