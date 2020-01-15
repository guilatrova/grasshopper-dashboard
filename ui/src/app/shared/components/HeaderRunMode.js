import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'

const HeaderRunMode = ({ status, rps, classes }) => {
  return (
    <React.Fragment>
      <Typography className={classes.barItem}>
        <span className={classes.label}>Status</span> {status}
      </Typography>

      <Typography className={classes.barItem}>
        <span className={classes.label}>RPS</span> {rps > -1 ? rps : "-"}
      </Typography>
    </React.Fragment>
  )
}

HeaderRunMode.propTypes = {
  status: PropTypes.string.isRequired,
  rps: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default HeaderRunMode;
