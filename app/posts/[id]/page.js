import React from 'react'
import { auth } from '@/auth'
import CommentForm from '@/components/CommentForm'

const page = async ({ params }) => {
    const session = await auth()

    const id = params.id
    const res = await fetch(`${process.env.URL}/api/posts/${id}`)
    const data = await res.json()
    console.log(data)

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <ul className='flex flex-col gap-2'>
                {data.comments.map(comment => (
                    <p className='bg-gray-400' key={comment.id}>{comment.text} - {comment.author}</p>
                ))}
            </ul>

            <CommentForm id={id} user={session?.user.name} />
        </div>
    )
}

export default page