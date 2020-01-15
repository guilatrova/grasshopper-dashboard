import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    headerCell: {
        whiteSpace: "nowrap"
    }
});

const StatisticsTableHeader = () => {
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell className={classes.headerCell} align='right'># requests</TableCell>
            <TableCell className={classes.headerCell} align='right'># fails</TableCell>
            <TableCell className={classes.headerCell} align='right'>Median (ms)</TableCell>
            <TableCell className={classes.headerCell} align='right'>Average (ms)</TableCell>
            <TableCell className={classes.headerCell} align='right'>Min (ms)</TableCell>
            <TableCell className={classes.headerCell} align='right'>Max (ms)</TableCell>
            <TableCell className={classes.headerCell} align='right'>Content Size (bytes)</TableCell>
            <TableCell className={classes.headerCell} align='right'># reqs/sec</TableCell>
        </TableRow>
    );
};

const StatisticsTableDataRow = ({ row }) => {
    return (
        <TableRow>
            <TableCell>{row.method}</TableCell>
            <TableCell component='th' scope='row'>{row.name}</TableCell>
            <TableCell align='right'>{row.num_requests}</TableCell>
            <TableCell align='right'>{row.num_failures}</TableCell>
            <TableCell align='right'>{Math.floor(row.median_response_time)}</TableCell>
            <TableCell align='right'>{row.avg_response_time}</TableCell>
            <TableCell align='right'>{row.min_response_time}</TableCell>
            <TableCell align='right'>{row.max_response_time}</TableCell>
            <TableCell align='right'>{Math.floor(row.avg_content_length)}</TableCell>
            <TableCell align='right'>{row.current_rps}</TableCell>
        </TableRow>
    );
};

const StatisticsTable = ({ stats = [] }) => {
    const classes = useStyles();
    return (
        <Table className={classes.table} aria-label='Locust Statistics'>
            <TableHead>
                <StatisticsTableHeader />
            </TableHead>
            <TableBody>
                {
                    stats.map(row =>
                        <StatisticsTableDataRow key={row.name} row={row} />
                    )
                }
            </TableBody>
        </Table>
    )
};

StatisticsTable.propTypes = {
    stats: PropTypes.array
}

export default StatisticsTable;
