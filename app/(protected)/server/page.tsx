import { UserInfo } from "@/components/shared/UserInfo";
import { currentUser } from "@/lib/auth";

const ServerPage = async () =>{
    const user = await currentUser();
    return (
       <UserInfo 
       label="💻Server component"
       user={user}
       />
    )
}
export default ServerPage;