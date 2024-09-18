"use client";

import Header from "@/components/shared/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Social from "@/components/auth/Social";
import { BackButton } from "../auth/BackButton";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerSubTitle?: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerTitle,
    headerSubTitle,
    backButtonLabel,
    backButtonHref,
    showSocial

}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header title={headerTitle} subtitle={headerSubTitle} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>
        </Card>
    )

}