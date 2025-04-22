import MessagePost from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const allMessages = await MessagePost.findAll();
    res.status(200).json(allMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await MessagePost.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  try {
    const existingPost = await MessagePost.findById(_id);
    if (!existingPost) {
      return res.status(404).send("The ID does not exist.");
    }

    const updatedPost = await MessagePost.findByIdAndUpdate(_id, post);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPost = await MessagePost.findById(id);
    if (!existingPost) {
      return res.status(404).send("The ID does not exist.");
    }

    await MessagePost.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await MessagePost.findById(id);
    if (!post) {
      return res.status(404).send("The ID does not exist.");
    }

    const updatedPost = await MessagePost.updateLikes(
      id,
      (post.post_likes || 0) + 1
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
