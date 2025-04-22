import React,{useState, useEffect} from 'react'
import  {TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from './styles.js'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'
import { useSelector } from 'react-redux'



const Form = ({currentID, setCurrentID}) => {
  const post = useSelector((state) => currentID?state.posts.find((p)=>p._id===currentID):null)
  const [postData, setPostData] = useState({
   posted_by:'', post_title:'',post_message:'',post_tags:'',selectedFile:''
  })
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(post)
    {
      setPostData(post)
    }
  },[post])
  const handleSubmit =(e) =>{
    e.preventDefault()
    console.log()
    if(currentID)
    {
      dispatch(updatePost(currentID, postData))
    }
    else{
      dispatch(createPost(postData))
      
    }
    clear()
  }
  const clear =() =>{
    setCurrentID(null)
    setPostData(({
      posted_by:'', post_title:'',post_message:'',post_tags:'',selectedFile:''
     }))
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant='h6'>{currentID? 'Edit ' : "Create "}a Post</Typography>
    <TextField name='creator' variant='outlined' label = "Creator" fullWidth value={postData.posted_by} onChange={(e) =>setPostData({...postData,posted_by:e.target.value})}/>
    <TextField name='title' variant='outlined' label = "Title" fullWidth value={postData.post_title} onChange={(e) =>setPostData({...postData,post_title:e.target.value})}/>
    <TextField name='message' variant='outlined' label = "Message" fullWidth value={postData.post_message} onChange={(e) =>setPostData({...postData,post_message:e.target.value})}/>
    <TextField name='tags' variant='outlined' label = "Tags" fullWidth value={postData.post_tags} onChange={(e) =>setPostData({...postData,post_tags:e.target.value.split(',')})}/>
    <div className={classes.fileInput}>
    <FileBase
    type="file"
    multiple = {false}
    onDone ={({base64})=> setPostData({...postData,selectedFile:base64})}
    />
    {/* <input type='file' multiple accept="image/*" onChange = {(e) =>setPostData({...postData,selectedFile:e.target.value})} /> */}
    </div>
    <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type="submit" fullWidth >Submit</Button>
    <Button variant='contained' color="secondary" size="small" onClick ={clear}fullWidth >Clear</Button>
    </form>
    </Paper>
  )
}

export default Form
