"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/shared/FormError";
import { FormSuccess } from "../shared/FormSucess";
import { login } from "@/lib/actions/login";
import { useSearchParams } from "next/navigation";
const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
     ? "Email already in user with different provider!" : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data) {
                        setError(data.error || "");  
                        setSuccess(data.success || ""); 
                    }
                })
                .catch((err) => {
                    setError("An error occurred during login.");
                });
        });
      
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="john.doe@example.com"
                                        type="email"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                </div>
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                <Button 
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Login
                </Button>
            </form>

        </Form>
    )
}

// "use client"
// import React from 'react'
// import AuthButton from './AuthButton'
// import { loginWithCreds } from '@/lib/actions/auth'

// function LoginForm() {
//     return (
//         <div>
//             <form action={loginWithCreds} className='w-full flex flex-col gap-4'>
//                 <div>
//                     <label>
//                         Email
//                     </label>
//                     <input
//                         type='email'
//                         placeholder='Email'
//                         id='Email'
//                         name="email"
//                         className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200' />

//                 </div>
//                 <div>
//                     <label>
//                         Password
//                     </label>
//                     <input
//                         type='password'
//                         placeholder='Password'
//                         name='password'
//                         id='Password'
//                         className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200' />

//                 </div>
//                 <div className='mt-4'>
//                     <AuthButton />
//                 </div>
//             </form>
//         </div>
//     )
// }

export default LoginForm