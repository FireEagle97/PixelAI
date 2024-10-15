import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
    return (

        <div className='w-full flex justify-center'>
          <section className='flex flex-col w-[400px]'>
            {/* <h1 className='text-3xl w-full text-center font-bold mb-6'>Sign in</h1> */}
            <RegisterForm />
          </section>
        </div>
    );
}

export default Register;