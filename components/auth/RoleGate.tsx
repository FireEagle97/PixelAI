"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/FormError";
import { ReactNode } from "react";

interface RoleGateProps {
    children: ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({
    children,
    allowedRole,
}: RoleGateProps) => {
    const role = useCurrentRole();
    if(role !== allowedRole){
        return (
            <FormError message="You do not have permission to view this content"/>
        )
    }
    return (
        <>
            {children}
        </>
    )

}