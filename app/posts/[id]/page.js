import React from 'react'

const page = async ({ params }) => {
    const id = params.id
    const res = await fetch(`${process.env.URL}/api/posts/${id}`)
    const data = await res.json()
    console.log(data)

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
        </div>
    )
}

export default page