import Link from "next/link";
import { auth } from "@/auth";

const AllPosts = async () => {
    const session = await auth()
    const res = await fetch(`${process.env.URL}/api/posts`, {cache: 'no-store'})
    const data = await res.json();
    
  return (
    <div>
        {data ? <ul className="flex flex-col">
            {data.map(item => (
                <div key={item._id} className="flex flex-row">
                    <div><Link  href={`posts/${item._id}`}> {item.title} </Link> <Link href={`profile/${item.userId}`}>{item.name}</Link></div>
                    {session?.user.id === item.userId && <Link href={`/admin/posts/${item._id}`} className="bg-blue-400 px-2 py-1 rounded-md">Edit Post</Link>}
                </div>
                
                ))}
        </ul> : <div>No data</div>}
    </div>
  )
}

export default AllPosts