import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { listUsers, signIn } from '../api/user'

type SignInProps = {}
type FormInputs = {
  email: string,
  password: string

}

const SignIn = (props: SignInProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormInputs> = dataInputs => {

    console.log(dataInputs); 

    const signInForm = async () => {
      const { data } = await signIn(dataInputs)
      console.log(data);
      localStorage.setItem("user",JSON.stringify(data))
      // navigate('/')
      
    }
    signInForm()
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <span>Không để trống</span>}
        <input type="text" {...register("password", { required: true })} />
        {errors.password && <span>Không để trống</span>}
        <button>SignIn</button>
      </form>
    </div>
  )
}

export default SignIn