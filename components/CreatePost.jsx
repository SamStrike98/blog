'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const CreatePost = ({ userId }) => {
    const router = useRouter()
    // const { data, isLoading, error } = useFetch(`http://localhost:3000/api/posts/${id}`)

    const [formData, setFormData] = useState({ title: '', body: '' });
    // console.log(formData.title)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('form submitted')


        const response = await fetch(`/api/posts`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: formData.title,
                body: formData.body,
                userId: userId
            })
        });

        if (response.status === 201) {
            alert('post Created')
        } else {
            alert('post NOT Created')
        }
    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-black" />

                <label htmlFor="body">Body</label>
                <textarea id="body" name="body" value={formData.body} onChange={handleChange} className="border border-black" />
                <button type="submit" className='bg-blue-400 rounded-md px-2 py-1'>Create Post</button>
            </form>

        </div>
    )
}

export default CreatePost