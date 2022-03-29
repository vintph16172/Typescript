import React from 'react'
import { useForm, SubmitHandler} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../api/user'

type SignUpProps = {}
type FormInputs = {
    email: string,
    password: string

}

const SignUp = (props: SignUpProps) => {
    const { register, handleSubmit , formState:{errors} } = useForm<FormInputs>()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<FormInputs> = data => {
        // signUp(data)
        const perrmisson = {perrmisson:1}
        console.log(data);
        navigate('/singup')

        
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register('email', {required: true})}/>
            {errors.email && <span>Không để trống</span>}
            <input type="text" {...register("password",{required: true})} />
            {errors.password && <span>Không để trống</span>}
            <button>SignUp</button>
        </form>
    </div>
  )
}

export default SignUp