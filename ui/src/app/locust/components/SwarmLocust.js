import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, Grid, FormControl, OutlinedInput, Button } from '@material-ui/core'
import ConfirmSwarmDialog from './ConfirmSwarmDialog';
import { states as appStates } from '/app/shared/duck';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  formControl: {
    width: '100%'
  }
});

const InputWrapped = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.form} item>
      <FormControl className={classes.formControl} variant='outlined'>
        <Typography>{label}</Typography>
        <OutlinedInput {...props} />
      </FormControl>
    </Grid>
  )
};

const ButtonWrapped = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.form} item>
      <Button variant='outlined' {...props}>
        {label}
      </Button>
    </Grid>
  )
};

const SwarmLocust = ({ onSwarm, onStop, appState }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangeOn = (setFunc) => (e) => setFunc(e.target.value);
  const onCloseDialog = () => setShowConfirm(false);
  const doSwarm = () => onSwarm(title, amount, rate);

  const onConfirmSwarmInViewMode = () => {
    onCloseDialog();
    history.push(`/stats`);
    doSwarm();
  };
  const handleSwarm = () => {
    if (appState === appStates.VIEW_STATE) {
      setShowConfirm(true);
    }
    else {
      doSwarm();
    }
  }

  return (
    <React.Fragment>
      <Grid alignItems='center' container spacing={2}>

        <InputWrapped
          id="title-input"
          label="Test Name"
          value={title}
          onChange={handleChangeOn(setTitle)}
        />

        <InputWrapped
          id="amount-input"
          label="Number of Users to Simulate"
          value={amount}
          onChange={handleChangeOn(setAmount)}
        />

        <InputWrapped
          id="hatch-rate-input"
          label="Hatch Rate (users spawned/second)"
          value={rate}
          onChange={handleChangeOn(setRate)}
        />

        <ButtonWrapped label="Start Test" onClick={handleSwarm} />
        <ButtonWrapped label="Stop Test" onClick={onStop} />

      </Grid>

      <ConfirmSwarmDialog open={showConfirm} onConfirm={onConfirmSwarmInViewMode} onClose={onCloseDialog} />
    </React.Fragment>
  )
}

SwarmLocust.propTypes = {
  onSwarm: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  appState: PropTypes.string.isRequired
}

export default SwarmLocust;
