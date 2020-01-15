import React, { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import {
    makeStyles,
    Paper,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core'
import OpenWithIcon from '@material-ui/icons/OpenWith';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: '8px',
        padding: '20px',
        overflowX: 'scroll'
    },
}));

const ExpandablePaper = ({ title, children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const [dialogId] = useState(_uniqueId());

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography variant='h6'>
                    <IconButton aria-label="expand" onClick={handleClickOpen}>
                        <OpenWithIcon fontSize="small" />
                    </IconButton>
                    {title}
                </Typography>
                {children}
            </Paper>

            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={open}
                onClose={handleClose}
                aria-labelledby={dialogId}
            >
                <DialogTitle id={dialogId}>{title}</DialogTitle>

                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ExpandablePaper;
