import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

//setting up router
const router = express.Router()
//setting routes
router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)//patch is used for updating existing documents...
router.delete('/:id', deletePost)
router.patch('/:id/likepost', likePost)
export default router