import CreatePost from '@/components/CreatePost'
import React from 'react'
import { auth } from '@/auth'

const page = async () => {
    const session = await auth()
    return (
        <div>
            <CreatePost userId={session?.user.id} name={session?.user.name} />
        </div>
    )
}

export default page