import axios from 'axios'
import { EC2_URL } from '../../credentials.js';

const url = EC2_URL;

export const fetchPosts =() => axios.get(url);
export const createPost=(newPost)=>axios.post(url,newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const likePost  =(id) => axios.patch(`${url}/${id}/likePost`)