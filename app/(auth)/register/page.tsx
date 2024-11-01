import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
    return (

        <div className='w-full flex justify-center'>
          <section className='flex flex-col w-[400px]'>
            <RegisterForm />
          </section>
        </div>
    );
}

export default Register;