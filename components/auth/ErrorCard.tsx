import { CardWrapper } from "../shared/CardWrapper";
import { FaExclamationTriangle } from "react-icons/fa";

export const ErrorCard = () => {
    return (
       <CardWrapper
        headerTitle="Oops! Something went wrong!"
        backButtonHref="/login"
        backButtonLabel="Back to login"
       >
        <div className="w-full flex justify-center items-center">
            <FaExclamationTriangle className="text-destructive w-8 h-8"/>
        </div>

       </CardWrapper>
    )
}