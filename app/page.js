import Image from "next/image";
import AllPosts from '@/components/AllPosts'
import { signIn } from "@/auth";
import Link from "next/link";
import { auth } from "@/auth";


export default async function Home() {
  const session = await auth()

  // const handleLogin = async () => {
  //   await signIn()
  // }
  console.log(session)
  return (
    <main className="">
      {/* <AllPosts /> */}
      <p>Hello</p>

    </main>
  );
}
