import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  comments: {
    type: Array
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Check if the model exists before defining it
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
