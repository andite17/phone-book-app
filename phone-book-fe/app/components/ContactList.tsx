'use client'

import { useEffect, useState } from "react"
import Contact from "./Contact"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

type contactSchema = {
    fullName: string,
    phoneNumber: string,
    email?: string,
    address?: string,
    favorite?: boolean
}

export default function ContactList({searchParam}) {

    const [data, setData] = useState<contactSchema[]>([])
    const [isLoading, setLoading] = useState(true)
    const [filteredContacts, setFilteredContacts] = useState<contactSchema[]>([]);
 
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/contact`);
            const contacts = await response.json();
            setData(contacts);
            setLoading(false)
        }

        const filterContacts = () => {
            const lowerSearchTerm = searchParam.toLowerCase();
            const filtered = data.filter((contact) => {
              // Example filtering by name and phone number (case-insensitive)
              return (
                contact.fullName.toLowerCase().includes(lowerSearchTerm) ||
                contact.phoneNumber.includes(lowerSearchTerm)
              );
            });
            setFilteredContacts(filtered);
          };
        if(searchParam.length == 0 || searchParam != undefined) {
            filterContacts();
        }

        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [searchParam])

    if (isLoading) return (
        <div className="mt-6 flex flex-col gap-2">
            {Array.from({ length: 50 }).map((index)=>(
                <div className="flex items-center space-x-4" key={index}>
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))
            }
        </div>
    )
    if (!data) return <p>No profile data</p>
    return(
        <>
        <ScrollArea className="mt-6 w-full h-screen">
            <div className="flex flex-col gap-2">
                {!(searchParam.length == 0) ?
                    filteredContacts.map((contact) => (
                        <Link href={`/contact/${contact.phoneNumber}`} key={contact.phoneNumber}>
                            <Contact key={contact.phoneNumber} name={contact.fullName} phoneNumber={contact.phoneNumber}/>
                        </Link>
                    ))
                
                :
                    data.map((contact)=>(
                        <Link href={`/contact/${contact.phoneNumber}`} key={contact.phoneNumber}>
                            <Contact key={contact.phoneNumber} name={contact.fullName} phoneNumber={contact.phoneNumber}/>
                        </Link>
                    ))
                }
            </div>
        </ScrollArea>
        </>
    )
}