"use client";
import { useState } from "react";
import Image from "next/image";
const DropdownList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="relative">
            <div className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="filter-trigger">
                    <figure>
                        <Image src="/assets/icons/hamburger.svg"
                            alt="menu"
                            height={14}
                            width={14}
                        />
                    </figure>
                    <Image src="/assets/icons/arrow-down.svg"
                        alt="arrow-down"
                        height={20}
                        width={20}
                    />
                </div>
            </div>

            {
                isOpen && (
                    <ul className="dropdown w-[8vw] py-2 ">
                        {["Most Viewed", "Most Recent", "Oldest First", "Least Viewed"].map((option, index) => (
                            <li key={index} className="list-item text-sm px-2 w-full text-gray-500 hover:text-white cursor-pointer">
                                {option}
                            </li>
                        ))}

                    </ul>
                )
            }
        </div>
    )
}

export default DropdownList;