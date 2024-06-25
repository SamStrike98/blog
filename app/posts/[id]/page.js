import React from 'react'
import { auth } from '@/auth'
import CommentForm from '@/components/CommentForm'
import Date from '@/components/Date'
import { FaRegComment } from "react-icons/fa";


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
            <div className='flex flex-row items-center'><FaRegComment /> {data.comments.length}</div>

            {data.comments.length === 0 ? <div>No Comments Yet</div>
                :
                <ul className='flex flex-col gap-2'>
                    {data.comments.map(comment => (
                        <div key={comment.id} className='bg-gray-400'>
                            <p  >{comment.text} - {comment.author}</p>
                            <Date dateString={comment.createdAt} />
                        </div>


                    ))}
                </ul>
            }
            <CommentForm id={id} user={session?.user.name} />

        </div>
    )
}

export default page