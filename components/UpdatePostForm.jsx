'use client'

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const UpdatePostForm = ({ data }) => {
    const router = useRouter()
    // const { data, isLoading, error } = useFetch(`http://localhost:3000/api/posts/${id}`)

    const [formData, setFormData] = useState({ title: data.title, body: data.body });
    // console.log(formData.title)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('form submitted')
        const id = data._id

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: formData.title,
                body: formData.body,
            })
        });

        if (response.status === 200) {
            alert('post updated')
        } else {
            alert('post NOT updated')
        }
    }

    const handleDelete = async () => {
        const id = data._id
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        })
        if (response.status === 200) {
            alert('post deleted')
            router.push('/admin/posts')
        } else {
            alert('post NOT deleted')
        }
    }
    return (
        <div>
            {/* {isLoading && <div>Loading...</div>} */}

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-black" />

                <label htmlFor="body">Body</label>
                <textarea id="body" name="body" value={formData.body} onChange={handleChange} className="border border-black" />
                <button type="submit" className='bg-blue-400 rounded-md px-2 py-1'>Update Post</button>
            </form>

            <button onClick={handleDelete} className="bg-red-400 rounded-md px-2 py-1">Delete Post</button>

            <Link href={`/posts/${data._id}`} className="bg-green-400 text-white px-2 py-1">View Post</Link>

            {/* {error && <div>{error}</div>} */}

        </div>
    )
}

export default UpdatePostForm