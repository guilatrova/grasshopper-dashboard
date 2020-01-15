import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({});

const RDSTableHeader = () => {
    return (
        <TableRow>
            <TableCell>DB Instance</TableCell>
            <TableCell>Size</TableCell>
        </TableRow>
    );
};

const RDSTableDataRow = ({ row }) => {
    return (
        <TableRow>
            <TableCell>{row.rds}</TableCell>
            <TableCell>{row.size}</TableCell>
        </TableRow>
    );
};

const RDSTable = ({ instances = [] }) => {
    const classes = useStyles();

    return (
        <Table className={classes.table} aria-label='AWS Container Images'>
            <TableHead>
                <RDSTableHeader />
            </TableHead>
            <TableBody>
                {
                    instances.map(row =>
                        <RDSTableDataRow key={row.rds} row={row} />
                    )
                }
            </TableBody>
        </Table>
    )
};

RDSTable.propTypes = {
    instances: PropTypes.array
}

export default RDSTable;
