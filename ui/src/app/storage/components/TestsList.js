import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    cursor: 'pointer',
    '&:hover': {
      background: '#9a0036'
    }
  }
}));

const formatDateTime = (timestamp) => new Date(timestamp).toString();

const TestsList = ({ items, onClick, onCopy }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>

      {items.map(item => {
        return (
          <ListItem key={item.datetime} onClick={() => onClick(item.datetime)} className={classes.item}>
            <ListItemText primary={item.title} secondary={formatDateTime(item.datetime)} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="copy" onClick={() => onCopy(item.datetime)}>
                <FileCopyIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}

    </List>
  );
}

TestsList.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired
}

export default TestsList;
