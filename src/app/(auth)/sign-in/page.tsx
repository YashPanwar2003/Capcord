"use client";   
import {useGoogleSignIn} from "@/lib/hooks/useSignIn";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
    const handleSignIn = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    
        await useGoogleSignIn();
    }
    return (
        <main className="sign-in">
            <aside className="testimonial">
                <Link href={"/"}>
                    <Image src="/assets/icons/logo.svg" alt="logo"
                        height={32}
                        width={32}
                    />
                    <h1>CapCord</h1>
                </Link>
                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 5 }).map((_, index) => {
                                return <Image src="/assets/icons/star.svg"
                                    alt="star"
                                    height={20}
                                    width={20}
                                    key={index}
                                />
                            })}
                        </figure>
                        <p>CapCord makes screen recording easy. From quick walkthroughs to full presentation, it's fast, smooth and shareable in seconds.</p>
                        <article>
                            <Image src="/assets/images/jason.png"
                                className="rounded-full"
                                alt="avatar"
                                height={64}
                                width={64}
                            />
                            <div>
                                <h2>
                                    Yash Panwar
                                </h2>
                                <p>
                                    Software Development Enthusiast
                                </p>
                            </div>
                        </article>
                    </section>

                </div>
                <p>
                    ©️ CapCord {(new Date()).getFullYear()}
                </p>
            </aside>
            <aside className="google-sign-in">
                <section>
                    <Link href={"/"}> 
                    <Image src="/assets/icons/logo.svg" alt="logo"
                        height={50}
                        width={50}
                    />
                    <h1>CapCord</h1>
                    </Link>
                    <p>Create and Share your very first  
                        <span> CapCord Video </span>
                        in no time!
                    </p>
                    <button 
                    onClick={handleSignIn}
                    >
                        <Image src={"/assets/icons/google.svg"}
                        alt="google"
                        height={22}
                        width={22}
                        /> 
                        
                        <span>Sign in with Google</span>
                    </button>
                </section>

            </aside>
            <div className="overlay"/>
            
        </main>
    )
}