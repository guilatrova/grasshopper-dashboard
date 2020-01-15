import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';


const COLORS = [
    deepOrange[700],
    indigo[700],
    pink[700],
    blue[700],
    cyan[700],
    red[700],
    teal[700],
    lime[700],
    yellow[700],
    orange[700],
    amber[700],
    purple[700],

    deepOrange[200],
    indigo[200],
    pink[200],
    blue[200],
    cyan[200],
    red[200],
    teal[200],
    lime[200],
    yellow[200],
    orange[200],
    amber[200],
    purple[200],

    deepOrange[900],
    indigo[900],
    pink[900],
    blue[900],
    cyan[900],
    red[900],
    teal[900],
    lime[900],
    yellow[900],
    orange[900],
    amber[900],
    purple[900],
];

export const randomColor = (idx) => COLORS[idx];

export const renderTime = (val) => new Date(val).toLocaleTimeString();
