import { NextResponse } from "next/server";
import { getAllPostsByUser } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import { auth } from "@/auth";


export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const id = params.id

        const post = await getAllPostsByUser(id);
        console.log("Fetched post:", post);

        return new NextResponse(JSON.stringify(post), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};