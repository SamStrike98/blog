'use client'

import { useFetch } from "@/hooks/useFetch"
import Link from "next/link"

const AdminPostsList = () => {
    const { data, loading, error } = useFetch(`http://localhost:3000/api/posts`)
    return (
        <div>
            {loading && <div>Loading...</div>}

            {data &&

                <div>
                    <ul className="gap-4">
                        {data.map(post => (
                            <div key={post._id} className="flex flex-row gap-3">
                                <h3>{post.title}</h3>
                                <Link href={`/admin/posts/${post._id}`} className="bg-blue-400 px-2 py-1 rounded-md">Edit Post</Link>
                            </div>
                        ))}
                    </ul>
                </div>}

            {error && <div>{error}</div>}
        </div>

    )
}

export default AdminPostsList