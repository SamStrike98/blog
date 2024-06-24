import { NextResponse } from "next/server";
import { addComment } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";

export const PATCH = auth(async function PATCH(request, { params }) {
    const { commentText, user } = await request.json()

    if (request.auth) {

        try {
            await dbConnect();
            // console.log("Database connected");
            // console.log(params.id)
            const id = params.id
            const commentId = new mongoose.Types.ObjectId()

            const post = await addComment(id, { commentText, user, commentId });
            // console.log("Added comment:", commentText);

            return new NextResponse(JSON.stringify(post), {
                status: 200
            });
        } catch (error) {
            // console.error("Error addding comment:", error);
            return new NextResponse(error.message, {
                status: 500
            });
        }
    } else {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

});