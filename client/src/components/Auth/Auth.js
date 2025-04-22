import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import useStyles from './styles.js'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
const Auth = () => {
 const classes = useStyles() 
 const [showPassword, setShowPassword] = useState(false)
 const[isSignUp, setIsSignUp] = useState(false)
 
 const handleSubmit =()=>{

 }
 const handleChange =()=>{

 }
 const handleShowPassword =()=>{
setShowPassword((prevShowPassword)=> !prevShowPassword)
 }
 const switchMode =()=>{
    setIsSignUp((prev)=>!prev)
    handleShowPassword(false)
 }
    return (
    <Container component = "main" maxWidth = "xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant = "h5">{isSignUp?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
<Grid container spacing={2}>
    {
        isSignUp && (
            <>
            
            
            <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
            <Input name='firstName' label="First Name" handleChange={handleChange}  half />
            </>
        )
    }
   <Input name='email' label="Email Address" handleChange={handleChange} type='email'autoFocus />
   <Input name='password' label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
    {isSignUp && <Input name='confirmPassword' label="Confirm Password" handleChange={handleChange} type="password"/>}
</Grid>
<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
    {isSignUp?'Sign Up' : 'Sign In'}
</Button>
<Grid container justifyContent='flex-end'>
    <Grid item>
        <Button onClick ={switchMode}>
            {isSignUp?'Already have an account? Sign In.':"Don't have an account? Sign Up. "}
        </Button>
    </Grid>
</Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth