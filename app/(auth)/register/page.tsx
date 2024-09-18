import RegisterForm from '@/components/auth/RegisterForm';
import { CardWrapper } from '@/components/shared/CardWrapper';

const Register = () => {
    return (
        <CardWrapper
        headerTitle='Create an account'
        backButtonHref='/login'
        backButtonLabel="Already have an account?"
        showSocial
      >
        <div className='w-full flex justify-center'>
          <section className='flex flex-col w-[400px]'>
            {/* <h1 className='text-3xl w-full text-center font-bold mb-6'>Sign in</h1> */}
            <RegisterForm />
            {/* <LoginGithub /> */}
          </section>
        </div>
      </CardWrapper>
    );
}

export default Register;