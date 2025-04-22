import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes.js'

import * as api from '../API' //importing everything from API folder as 'API'

//Creating Action creaters

export const getPosts =()=> async(dispatch) =>{
   try{
    const{data} = await api.fetchPosts()
    dispatch({type:FETCH_ALL, payload: data});
   }
catch(err){
console.log(err.message)
}   
    
    
}
export const createPost=(post)=>async(dispatch)=>{
   try{
      const{ data } = await api.createPost(post)
      dispatch({type: CREATE, payload: data})
   }catch(err){
      console.log(err)
   }
}

export const updatePost = (id, post) => async(dispatch) =>{
   try{
      const { data } = await api.updatePost(id,post)
      dispatch({type: UPDATE, payload: data})
   } catch(e){
      console.log(e) //Always console.log error not error.message
   }
}

export const deletePost = (id) => async(dispatch)=>{
   try{
      await api.deletePost(id)

      dispatch({type:DELETE, payload:id})
   } catch(e){
      console.log(e)
   }
}

export const likePost = (id) => async(dispatch) =>{
   try{
      const { data } = await api.likePost(id)
      dispatch({type: UPDATE, payload: data})
   }
   catch(e){
      console.log(e)
   }
}