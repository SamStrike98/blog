

import Link from 'next/link'
import { auth, signIn, signOut } from '@/auth'


const adminLinks = [
    {
        id: 1,
        name: 'Home',
        link: '/admin/dashboard'
    },

    {
        id: 2,
        name: 'Posts',
        link: '/admin/posts'
    },
    {
        id: 3,
        name: 'Create Posts',
        link: '/admin/posts/create'
    },
]

const navLinks = [
    {
        id: 1,
        name: 'Home',
        link: '/'
    },

    {
        id: 2,
        name: 'Posts',
        link: '/posts'
    },
    {
        id: 3,
        name: 'Contact',
        link: '/contact'
    },
]

const Navbar = async () => {

    const session = await auth()

    return (
        <div className='h-full bg-green-500'>
            <nav>
                {navLinks.map(item => (
                    <Link key={item.id} href={item.link}>{item.name}</Link>
                ))}
            </nav>

            <div>
                {session?.user ?

                    <form action={async () => {
                        'use server'
                        await signOut({ redirectTo: "/" })
                    }}>
                        <button type='submit'>Logout</button>
                    </form>
                    :
                    <form action={async () => {
                        'use server'
                        await signIn('google', { redirectTo: "/" })
                    }}>
                        <button type='submit'>Sign In</button>
                    </form>}
            </div>
        </div>


    )
}

export default Navbar