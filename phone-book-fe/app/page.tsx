'use client'

import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus, FaUser } from "react-icons/fa6";
import ContactList from "./components/ContactList";
import Link from "next/link";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { useState } from "react";



export default function Home() {
  const [search, setSearchParam] = useState<string>("");

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value);
  };

  return (
    <main className="flex h-dvh max-w-screen-sm flex-col overflow-hidden mx-auto px-4 border relative">
      <div className="flex flex-col mt-3 w-ful relative">

        <h1 className="mb-5 text-2xl">My Contacts</h1>

        <div className="flex items-center w-full rounded-[20px] border border-input bg-background px-3 py-2 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <label className="text-2xl" htmlFor="search" ><IoIosSearch/></label>
          <input onChange={handleSearchChange} className="h-full w-full p-2 border-none outline-none" id="search" type="text" placeholder="Search by name or phone number"/>
        </div>

        <ContactList searchParam={search}/> 


        <Link href={"/add"}>
          <FaCirclePlus className="text-6xl cursor-pointer absolute right-6 bottom-44" />
        </Link>

      </div>

    </main>
  );
}
