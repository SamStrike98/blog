import { NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
    if (request.auth?.user.role === 'admin') {
        try {
            const { title, body, userId } = await request.json();

            console.log("Title:", title, "Body:", body);

            // Create a DB Connection
            await dbConnect();
            console.log("Database connected");

            // Form a DB Payload
            const newPost = {
                title,
                body,
                userId

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
    } else {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }
});

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


