import ResetForm from "@/components/auth/ResetForm";
import { CardWrapper } from "@/components/shared/CardWrapper";

const ResetPage = () => {
  return (
    <CardWrapper
      headerTitle='Forgot your password?'
      backButtonHref='/login'
      backButtonLabel="Back to login"
    >
      <div className='w-full flex justify-center'>
        <section className='flex flex-col w-[400px]'>
          <ResetForm />
        </section>
      </div>
    </CardWrapper>
  )
}
export default ResetPage;