import AdminPostsList from "@/components/AdminPostsList"
import Link from "next/link"
import { auth } from "@/auth"

const page = async () => {
    const session = await auth()
    return (


        <div>
            {session?.user.role === 'admin' ?
                <div>
                    <h1>Admin - All Posts</h1>
                    <AdminPostsList />

                    <Link href={'posts/create'} className="bg-yellow rounded-md px-2 py-1">Create New Post</Link>
                </div>
                :
                <div>not admin</div>
            }
        </div>
    )
}

export default page