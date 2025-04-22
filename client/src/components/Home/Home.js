import React, { useState, useEffect } from 'react'
import{Container, Grid, Grow} from '@material-ui/core'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import {useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts.js'
import useStyles from '../../styles.js'
const Home = () => {
    const[currentId, setCurrentId] = useState(null)

    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getPosts()); //for dispatching an action
    },[dispatch,currentId])
    return (
    <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justify="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentID={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form currentID = {currentId} setCurrentID={setCurrentId}/>

                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home