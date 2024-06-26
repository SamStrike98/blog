import Post from "@/model/post-model";


export async function createPost(post) {
    try {
        await Post.create(post);
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllPosts() {
    try {
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllPostsByUser(userId) {
    try {
        const posts = await Post.find({ userId: userId });
        return posts;
    } catch (error) {
        throw new Error(error)
    }
}


export async function getPostById(id) {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

export async function updatePost(id, { title, body }) {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: id },
            { title: title, body: body }
        );
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

export async function deletePost(id) {
    try {
        const post = await Post.findByIdAndDelete(id);
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

export async function addComment(id, { commentText, user, userId, commentId, createdAt }) {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: id },
            { $push: { comments: { text: commentText, author: user, id: commentId, createdAt: createdAt, userId: userId } } }
        );
        return post;
    } catch (error) {
        throw new Error(error)
    }
}