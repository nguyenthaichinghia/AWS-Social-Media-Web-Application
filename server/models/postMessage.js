import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/mysql.js";

class MessagePost {
  static async create(postData) {
    const id = uuidv4();
    const [result] = await pool.execute(
      'INSERT INTO posts (_id, title, message, creator, tags, selectedFile, likeCount) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        id, 
        postData.post_title || "", 
        postData.post_message || "", 
        postData.posted_by || "", 
        JSON.stringify(postData.post_tags || []), 
        postData.selectedFile || "", 
        postData.post_likes || 0
      ]
    );
    
    return {
      _id: id,
      post_title: postData.post_title || "",
      post_message: postData.post_message || "",
      posted_by: postData.posted_by || "",
      post_tags: postData.post_tags || [],
      selectedFile: postData.selectedFile || "",
      post_likes: postData.post_likes || 0,
      createdAt: new Date().toISOString()
    };
  }

  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM posts ORDER BY createdAt DESC');
      return rows.map(row => ({
        _id: row._id,
        post_title: row.title,
        post_message: row.message,
        posted_by: row.creator,
        post_tags: JSON.parse(row.tags || '[]'),
        selectedFile: row.selectedFile,
        post_likes: row.likeCount,
        createdAt: row.createdAt
      }));
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM posts WHERE _id = ?', [id]);
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return {
        _id: row._id,
        post_title: row.title,
        post_message: row.message,
        posted_by: row.creator,
        post_tags: JSON.parse(row.tags || '[]'),
        selectedFile: row.selectedFile,
        post_likes: row.likeCount,
        createdAt: row.createdAt
      };
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  static async findByIdAndUpdate(id, updateData) {
    try {
      const [result] = await pool.execute(
        'UPDATE posts SET title = ?, message = ?, creator = ?, tags = ?, selectedFile = ?, likeCount = ? WHERE _id = ?',
        [
          updateData.post_title,
          updateData.post_message,
          updateData.posted_by,
          JSON.stringify(updateData.post_tags),
          updateData.selectedFile,
          updateData.post_likes,
          id
        ]
      );
      
      if (result.affectedRows === 0) return null;
      return this.findById(id);
    } catch (error) {
      console.error('Error in findByIdAndUpdate:', error);
      throw error;
    }
  }

  static async findByIdAndRemove(id) {
    try {
      await pool.execute('DELETE FROM posts WHERE _id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Error in findByIdAndRemove:', error);
      throw error;
    }
  }

  static async updateLikes(id, likes) {
    try {
      await pool.execute('UPDATE posts SET likeCount = ? WHERE _id = ?', [likes, id]);
      return this.findById(id);
    } catch (error) {
      console.error('Error in updateLikes:', error);
      throw error;
    }
  }
}

export default MessagePost;
