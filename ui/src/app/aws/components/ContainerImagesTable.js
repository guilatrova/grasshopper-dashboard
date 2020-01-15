import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({});

const ContainerImagesTableHeader = () => {
    return (
        <TableRow>
            <TableCell>Container</TableCell>
            <TableCell>Image</TableCell>
        </TableRow>
    );
};

const ContainerImagesTableDataRow = ({ row }) => {
    return (
        <TableRow>
            <TableCell>{row.container}</TableCell>
            <TableCell>
                <span>{row.image}</span>
                <a href={row.commit_link}>(GitHub)</a>
            </TableCell>
        </TableRow>
    );
};

const ContainerImagesTable = ({ containers = [] }) => {
    const classes = useStyles();
    return (
        <Table className={classes.table} aria-label='AWS Container Images'>
            <TableHead>
                <ContainerImagesTableHeader />
            </TableHead>
            <TableBody>
                {
                    containers.map(row =>
                        <ContainerImagesTableDataRow key={row.container} row={row} />
                    )
                }
            </TableBody>
        </Table>
    )
};

ContainerImagesTable.propTypes = {
    containers: PropTypes.array
}

export default ContainerImagesTable;
