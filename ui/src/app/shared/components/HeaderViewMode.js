import React from 'react'
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core'

const HeaderViewMode = ({ date, title = "", classes }) => {
  return (
    <React.Fragment>
      <Typography className={classes.barItem}>
        <span className={classes.label}>Title</span> {title}
      </Typography>

      <Typography className={classes.barItem}>
        <span className={classes.label}>Date</span> {date}
      </Typography>
    </React.Fragment>
  );
}

HeaderViewMode.propTypes = {
  date: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
}

export default HeaderViewMode;
