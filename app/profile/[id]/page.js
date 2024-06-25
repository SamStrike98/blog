import React from 'react'
import { auth } from '@/auth'

const page = async ({ params }) => {
    const id = params.id
    const session = await auth()
    return (
        <div>
            {id} - {id === session?.user.id ? <p>Can edit</p> : <p>Cannot edit</p>}
        </div>
    )
}

export default page