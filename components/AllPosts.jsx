import Link from "next/link";

const AllPosts = async () => {
    const res = await fetch(`${process.env.URL}/api/posts`)
    const data = await res.json();
    
  return (
    <div>
        {data ? <ul className="flex flex-col">
            {data.map(item => (<Link key={item._id} href={`posts/${item._id}`}> {item.title} </Link>))}
        </ul> : <div>No data</div>}
    </div>
  )
}

export default AllPosts