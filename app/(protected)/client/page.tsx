"use client"
import { UserInfo } from "@/components/shared/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-session";

const ClientPage =  () =>{
    const user =  useCurrentUser();
    return (
       <UserInfo 
       label="💻Client component"
       user={user}
       />
    )
}
export default ClientPage;