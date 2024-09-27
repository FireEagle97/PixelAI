"use client";
import { CardWrapper } from "@/components/shared/CardWrapper";
import {BeatLoader} from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/lib/actions/NewVerification";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
export const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token){
            setError("Missing token!");
            return;
        }
        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error)
        })
        .catch(() => {
            setError("Something went wrong!")
        })
    }, [token, success, error]);
    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    return (
        <CardWrapper
        headerTitle="Confirming your verification"
        backButtonHref="/login"
        backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error &&(
                    <BeatLoader/>
                )}
                
                <FormSuccess message={success}/>
                {!success && (
                    <FormError message={error}/>
                )}
                
            </div>
        </CardWrapper>
    )
}