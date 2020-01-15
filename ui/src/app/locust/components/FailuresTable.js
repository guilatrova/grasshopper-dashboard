import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({});

const FailuresTableHeader = () => {
    return (
        <TableRow>
            <TableCell># fails</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
        </TableRow>
    );
};

const FailuresTableDataRow = ({ row }) => {
    return (
        <TableRow>
            <TableCell align='right'>{row.occurences}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.error}</TableCell>
        </TableRow>
    );
};

const FailuresTable = ({ failures = [] }) => {
    const classes = useStyles();
    return (
        <Table className={classes.table} aria-label='Locust Failures'>
            <TableHead>
                <FailuresTableHeader />
            </TableHead>
            <TableBody>
                {
                    failures.map(row =>
                        <FailuresTableDataRow key={row.name} row={row} />
                    )
                }
            </TableBody>
        </Table>
    )
};

FailuresTable.propTypes = {
    failures: PropTypes.array.isRequired
}

export default FailuresTable;
