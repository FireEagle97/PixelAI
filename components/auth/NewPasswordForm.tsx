"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
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
import { newPassword } from "@/lib/actions/newPassword";
import { CardWrapper } from "../shared/CardWrapper";
const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")
        console.log(values)
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    if (data) {
                        setError(data.error);
                        setSuccess(data.success);
                    }
                })
                .catch((err) => {
                    setError("An error occurred during login.");
                });
        });

    }
    return (
        <CardWrapper    
            headerTitle="Enter a new password"
            backButtonHref="/login"
            backButtonLabel="Back to login"
            >
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    >
                    </FormField>
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Reset password
                </Button>
            </form>

        </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm