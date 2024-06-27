import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import PostsByUser from '@/components/PostsByUser';

const page = async ({ params }) => {
    const id = params.id
    const session = await auth()
    if (!session?.user) {
        redirect('/')
    } else {
        return (
            <div>
                {id} - {id === session?.user.id ? <p>Can edit</p> : <p>Cannot edit</p>}

                <PostsByUser id={id} />
            </div>
        )
    }

}

export default page