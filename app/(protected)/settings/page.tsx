"use client"
import { useCurrentUser } from "@/hooks/use-current-session";
const SettingsPage = () => {
    const user =  useCurrentUser();
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    );
}
export default SettingsPage;