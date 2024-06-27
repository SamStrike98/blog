import React from 'react'
import { auth } from '@/auth'
import CommentForm from '@/components/CommentForm'
import Date from '@/components/Date'
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link';


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
            <p>{data.name}</p>
            <div className='flex flex-row items-center'><FaRegComment /> {data.comments.length}</div>

            {data.comments.length === 0 ? <div>No Comments Yet</div>
                :
                <ul className='flex flex-col gap-2'>
                    {data.comments.map(comment => (
                        <div key={comment.id} className='bg-gray-400'>
                            <div><p>{comment.text}</p> <Link href={`/profile/${comment.userId}`}>{comment.author}</Link></div>
                            <Date dateString={comment.createdAt} />
                        </div>


                    ))}
                </ul>
            }
            <CommentForm id={id} user={session?.user.name} userId={session?.user.id} />

        </div>
    )
}

export default page