import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, PaperComponent } from '@material-ui/core';

const ConfirmSwarmDialog = ({ open, onConfirm, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={PaperComponent}
            aria-labelledby="confirm-dialog-title"
        >
            <DialogTitle id="confirm-dialog-title">
                Confirm Swarm
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    You're about to start a new test, but you're in VIEW mode.
                    Are you sure you want to start a new test?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={onClose} color="primary">
                    Cancel
                </Button>

                <Button onClick={onConfirm} color="primary">
                    Swarm!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmSwarmDialog;
