import React from 'react'
import { 
  FormControl,
  Select as MuiSelect,
  Input,
  InputLabel,
  Chip,
  MenuItem,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
})

const Select = ({
  onChange,
  value,
  options
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Select a service</InputLabel>
      <MuiSelect
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        variant='filled'
        value={value}
        onChange={onChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          }
        }}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select