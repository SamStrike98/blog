import { NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/queries/posts";
import dbConnect from "@/lib/mongo";

export const POST = async (request) => {
    try {
        const { title, body } = await request.json();
        
        console.log("Title:", title, "Body:", body);

        // Create a DB Connection
        await dbConnect();
        console.log("Database connected");

        // Form a DB Payload
        const newPost = {
            title,
            body
        };

        // Update the DB
        await createPost(newPost);
        console.log("Post created:", newPost);

        return new NextResponse("Post has been created", {
            status: 201
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};

export const GET = async (request) => {
    try {
        await dbConnect();
        console.log("Database connected");

        const posts = await getAllPosts();
        console.log("Fetched posts:", posts);

        return new NextResponse(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};
