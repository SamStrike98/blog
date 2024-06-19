import { NextResponse } from "next/server";
import { getPostById, updatePost } from "@/queries/posts";
import dbConnect from "@/lib/mongo";


export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const id = params.id

        const post = await getPostById(id);
        console.log("Fetched post:", post);

        return new NextResponse(JSON.stringify(post), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { title, body } = await request.json()


    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const id = params.id

        const post = await updatePost(id, { title, body });
        console.log("Updated Post:", post);

        return new NextResponse(JSON.stringify(post), {
            status: 200
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};