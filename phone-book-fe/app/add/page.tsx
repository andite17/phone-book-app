'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addContactFormSchema = z.object({
  fullName: z
  .string()
  .min(4, "Full Name field minimum 1 character")
  .max(255, "Full Name field maximum 255 character"),
  phoneNumber: z
  .string()
  .min(1, "Phone Number field minimum 1 character")
  .max(255, "Phone Number field maximum 255 character"),
  address: z
  .string().optional(),
  email: z
  .string()
  .email()
  .optional()
})

type AddContactFormSchema = z.infer<typeof addContactFormSchema>




export default function AddContact() {
  
  const { toast } = useToast()
  const router = useRouter();
  const AVATAR_URL = "https://ui-avatars.com/api/?background=random&rounded=true&"
    const form = useForm<AddContactFormSchema>({
      resolver: zodResolver(addContactFormSchema),
    });

    const {register, handleSubmit, formState, control}= form;

    const postData = async (v:AddContactFormSchema) => {
        const response = await fetch("http://localhost:8080/api/v1/contact", { 
            method: "POST", 
            body: JSON.stringify({ 
                fullName: v.fullName, 
                phoneNumber: v.phoneNumber, 
                email: v.email, 
                address: v.address
            }), 
            headers: { 
                "Content-type": "application/json"
            } 
        }); 
        const data = await response.json();
        if (data.message != null) {
          alert("error")
          throw new Error(data.message);
        }
        return data;
    }

    const submitContact = handleSubmit(async (value : AddContactFormSchema)=>{
      try {
        const f = await postData(value);
        router.push("/");
      } catch (error) {
        toast({
          title: "Error",
          description: (error as { message: string }).message,
        })
      }
    })

    return (
      <main className="flex h-dvh max-w-screen-sm flex-col overflow-hidden mx-auto relative">
        <div className="px-4 h-full flex items-center justify-center">
          {/* <Toaster /> */}
          <Form {...form}>
            <form className="w-full shadow-lg" onSubmit={submitContact}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Add New Contact</CardTitle>
                  {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                </CardHeader>
                <CardContent>
                      <div className="grid w-full items-center gap-4">
                        <FormField
                          control={control}
                          name="fullName"
                          render={({field})=> {

                            return(
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Input Full Name" {...field} />
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
                                  <Input type="number" placeholder="Input Phone Number" {...field} />
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
                                  <Input type="email" placeholder="Input Email" {...field} />
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
                                  <Input type="address" placeholder="Input Address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={"/"}>
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit">Save</Button>
                </CardFooter>
              </Card>
              </form>
          </Form>
          {/* <div className="">
          </div> */}
        </div>
      </main>
    );
  }