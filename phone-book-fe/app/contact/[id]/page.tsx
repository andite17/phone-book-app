'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { toast, useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { MdArrowBackIosNew } from "react-icons/md"
import { z } from "zod"


const AVATAR_URL = "https://ui-avatars.com/api/?background=random&rounded=true&"

type contactSchema = {
    fullName: string,
    phoneNumber: string,
    email?: string,
    address?: string,
    favorite?: boolean
}

const updateContactFormSchema = z.object({
    fullName: z
    .string().optional(),
    phoneNumber: z
    .string().optional(),
    address: z
    .string().optional(),
    email: z
    .string()
    .email()
    .optional(),
    favorite: z.boolean().optional()
  })
  
  type UpdateContactFormSchema = z.infer<typeof updateContactFormSchema>

  
  export default function ContactDetail() {
      const params = useParams()
      const router = useRouter()
      const toast = useToast()
      const {id} = params
      const [contact, setContact] = useState<contactSchema>();
      const [isLoading, setIsLoading] = useState(true);
      const [fullname, setFullname] = useState("");
      const [edit, setEdit] = useState(false);
      
      const validationForm = (value : UpdateContactFormSchema) => {
        if(value.fullName == null) {
            value.fullName = contact?.fullName
        }
        if(value.phoneNumber == null) {
            value.phoneNumber = contact?.phoneNumber
        }
        if(value.email == null) {
            value.email = contact?.email
        }
        if(value.address == null) {
            value.address = contact?.address
        }
        if(value.favorite == null) {
            value.favorite = contact?.favorite
        }
        return value;
      }
      const form = useForm<UpdateContactFormSchema>({
        resolver: zodResolver(updateContactFormSchema),
      });
  
    const {register, handleSubmit, formState, control}= form;

    const postData = async (v:UpdateContactFormSchema) => {
        const dataValid = validationForm(v);
        const response = await fetch(`http://localhost:8080/api/v1/contact/${id}`, { 
            method: "PUT", 
            body: JSON.stringify(dataValid), 
            headers: { 
                "Content-type": "application/json"
            } 
        }); 
        console.log(dataValid)
        const data = await response.json();
        if (data.message != null) {
            alert("error")
            throw new Error(data.message);
        }
        return data;
    }

    const submitContact = handleSubmit(async (value : UpdateContactFormSchema)=>{
        try {
          const f = await postData(value);
          router.push("/");
        } catch (error) {
          // const r = error
          toast({
            title: "Error",
            description: (error as { message: string }).message,
          })
        }
      })


    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/contact/${id}`);
            const data = await response.json();
            setContact(data);
            setFullname(data.fullName.split(" "))
            setIsLoading(false);
        };

        fetchData();
    },[id])

    return(
        <main className="flex h-dvh max-w-screen-sm flex-col overflow-hidden mx-auto border relative">
            <Form {...form}>
                <form onSubmit={submitContact} className="px-4">
                    <div className="flex justify-between mt-3">
                        {edit ?
                        <>
                            <span className="cursor-pointer" onClick={()=>{setEdit(!edit)}}>cancel</span>
                            <button type="submit" className="cursor-pointer">update</button>
                        </>
                        :
                        <>
                            <Link href={"/"}>
                              <MdArrowBackIosNew className="text-[25px]"/>
                            </Link>
                            <span className="cursor-pointer text-[20px]" onClick={()=>{setEdit(!edit)}}>edit</span>
                        </>
                        }
                    </div>
                    <Toaster />
                    <div className="mt-4 ">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div>
                                <img className="w-[200px] h-[200px]" src={AVATAR_URL+`name=${fullname[0]}+${fullname[1]}`} alt="" />
                            </div>
                            <p className="text-xl font-semibold">{contact?.fullName}</p>
                            <span>{contact?.phoneNumber}</span>
                        </div>
                    </div>


                    <div className="grid w-full items-center gap-4">
                        <FormField
                          control={control}
                          name="fullName"
                          render={({field})=> {

                            return(
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    {edit?
                                        <Input placeholder="Input Full Name" {...field}/>
                                        :
                                        <Input disabled={true} placeholder="Input Full Name" value={contact?.fullName}/>
                                    }
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />

                        <FormField
                          control={control}
                          name="phoneNumber"
                          render={({field})=> {

                            return(
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    {edit
                                    ?
                                        <Input placeholder="Input Phone Number" {...field}/>
                                    :
                                        <Input disabled={true} placeholder="Input Phone Number" {...field} value={contact?.phoneNumber}/>
                                    }
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />

                        <FormField
                          control={control}
                          name="email"
                          render={({field})=> {

                            return(
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    {edit
                                    ?
                                        <Input placeholder="Input Email" {...field}/>
                                    :
                                        <Input disabled={true} type="email" placeholder="Input Email" {...field} value={contact?.email}/>
                                    }
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />

                        <FormField
                          control={control}
                          name="address"
                          render={({field})=> {

                            return(
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    {edit
                                    ?
                                        <Input placeholder="Input Address" {...field}/>
                                    :
                                        <Input disabled={true} placeholder="Input Address" {...field} value={contact?.address}/>
                                    }
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                    </div>
                </form>
            </Form>
        </main>

    )
}