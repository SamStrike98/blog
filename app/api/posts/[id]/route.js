import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/queries/posts";
import dbConnect from "@/lib/mongo";
import { auth } from "@/auth";


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

export const PATCH = auth(async function PATCH(request, { params }) {

    if (request.auth.user.role === 'admin') {
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
    } else {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }
});


export const DELETE = auth(async function DELETE(request, { params }) {

    if (request.auth.user.role === 'admin') {
        try {
            await dbConnect();
            console.log("Database connected");
            console.log(params.id)
            const id = params.id

            const post = await deletePost(id);
            console.log("Deleted Post:", post);

            return new NextResponse(JSON.stringify(post), {
                status: 200
            });
        } catch (error) {
            console.error("Error Deleting post:", error);
            return new NextResponse(error.message, {
                status: 500
            });
        }
    } else {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }
});