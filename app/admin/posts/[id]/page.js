'use client'

import UpdatePostForm from "@/components/updatePostForm"
import { useFetch } from "@/hooks/useFetch"


const Page = ({ params }) => {

    const id = params.id
    // const res = await fetch(`${process.env.URL}/api/posts/${id}`)
    // const data = await res.json()
    // console.log(data)

    const { data, loading, error } = useFetch(`http://localhost:3000/api/posts/${id}`)

    return (
        <div>
            {loading && <div>Loading...</div>}

            {data && <UpdatePostForm data={data} />}

            {error && <div>{error}</div>}

        </div>

    )
}

export default Page