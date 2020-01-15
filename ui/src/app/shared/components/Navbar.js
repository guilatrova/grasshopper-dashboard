import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectors } from '../duck';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import ErrorIcon from '@material-ui/icons/Error';
import GroupIcon from '@material-ui/icons/Group';
import DomainIcon from '@material-ui/icons/Domain';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


const Navbar = ({ testId }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (e, value) => {
    history.push(`/${value}/${testId}`);
  }

  return (
    <BottomNavigation
      showLabels
      onChange={handleChange}
    >
      <BottomNavigationAction label="Statistics" value="stats" icon={<TrendingUpIcon />} />
      <BottomNavigationAction label="Errors" value="errors" icon={<ErrorIcon />} />
      <BottomNavigationAction label="Users" value="users" icon={<GroupIcon />} />
      <BottomNavigationAction label="Infrastructure" value="aws" icon={<DomainIcon />} />
      <BottomNavigationAction label="Recents" value="list" icon={<RestoreIcon />} />
    </BottomNavigation>
  );
};

const mapStateToProps = state => ({
  testId: selectors.getTestId(state) || ""
});

export default connect(mapStateToProps)(Navbar);
