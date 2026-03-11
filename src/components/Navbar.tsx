"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function Navbar() {
    const router = useRouter();
    const { data: session } = authClient.useSession()
    const user = session?.user;
    return (
        <header className="navbar">
            <nav>
                <Link href={"/dashboard"}>
                    <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
                    <h1>CapCord</h1>
                </Link>
                {
                    user && (
                        <figure className="flex gap-3">
                            <button onClick={() => router.push(`/profile/${user?.id}`)}>
                                <Image src={user?.image || "/assets/images/dummy.jpg"} alt="User" width={36} height={36} className="rounded-full" />
                            </button>
                            <button className="cursor-pointer"
                            onClick={async()=>{
                                return await authClient.signOut({
                                    fetchOptions :{
                                        onSuccess:()=>{
                                            redirect("/sign-in")
                                        }
                                    }
                                })
                            }}
                            >
                                <Image src="/assets/icons/logout.svg" alt="Logout" width={32} height={32}
                                    className="rotate-180"
                                />
                            </button>

                        </figure>
                    )
                }
            </nav>

        </header>
    )
}