'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const CommentForm = ({ id, user, userId }) => {
    const router = useRouter()
    // const { data, isLoading, error } = useFetch(`http://localhost:3000/api/posts/${id}`)

    const [formData, setFormData] = useState({ comment: '' });
    // console.log(formData.title)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('form submitted')


        const response = await fetch(`/api/posts/${id}/comments`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                commentText: formData.comment,
                user: user,
                userId
            })
        });

        if (response.status === 200) {
            // alert('Comment added')
            setFormData({ comment: '' })
            router.refresh();
        } else {
            alert('Comment NOT added')
        }
    }


    return (
        <div>
            {user ?
                <form onSubmit={handleSubmit}>
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} className="border border-black" />
                    <button type="submit" className='bg-blue-400 rounded-md px-2 py-1'>Post Comment</button>
                </form>
                :

                <form className="opacity-40">
                    <p>You need to login to comment</p>
                    <label htmlFor="comment">Comment</label>
                    <textarea disabled id="comment" name="comment" className="border border-black" />
                    <button disabled type="submit" className='bg-blue-400 rounded-md px-2 py-1'>Post Comment</button>
                </form>
            }



        </div>
    )
}

export default CommentForm