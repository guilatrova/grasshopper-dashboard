import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({});

const ExceptionsTableHeader = () => {
    return (
        <TableRow>
            <TableCell># occurences</TableCell>
            <TableCell>Traceback</TableCell>
        </TableRow>
    );
};

const ExceptionsTableDataRow = ({ row }) => {
    return (
        <TableRow>
            <TableCell align='right'>{row.count}</TableCell>
            <TableCell>{row.traceback}</TableCell>
        </TableRow>
    );
};

const ExceptionsTable = ({ exceptions = [] }) => {
    const classes = useStyles();
    return (
        <Table className={classes.table} aria-label='Locust Exceptions'>
            <TableHead>
                <ExceptionsTableHeader />
            </TableHead>
            <TableBody>
                {
                    exceptions.map(row =>
                        <ExceptionsTableDataRow key={row.msg} row={row} />
                    )
                }
            </TableBody>
        </Table>
    )
};

ExceptionsTable.propTypes = {
    exceptions: PropTypes.array.isRequired
}

export default ExceptionsTable;
