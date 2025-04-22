import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibilty from '@material-ui/icons/Visibility'
import VisibiltyOff from '@material-ui/icons/VisibilityOff'

const Input = ({half,name, label,handleChange,autoFocus,type,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half?6:12}>
        <TextField 
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name==='password'&&{
            endAdornment:(
                <InputAdornment postition = "end">
                <IconButton onClick={handleShowPassword}>
                {type === "password"?<Visibilty /> : <VisibiltyOff />}

                </IconButton>
                </InputAdornment>
            )
        }}
        />
    </Grid>
  )
}

export default Input