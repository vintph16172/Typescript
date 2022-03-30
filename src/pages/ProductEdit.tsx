import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate,useParams} from 'react-router-dom'
import { detailProduct } from '../api/product'
import { ProductType } from './type/product'
import { Input } from 'antd';

type ProductEditProps = {
    onEdit: (product: ProductType)=>void
    
}
type FormInputs = {
    name: string,
    category: string
    price: number,
    view: number,
    status: number
}

const ProductEdit = ({onEdit}: ProductEditProps) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<FormInputs>()
    const navigate = useNavigate()
    const {id} = useParams();
    console.log(id);
    
    useEffect(()=>{
        const getProduct = async () => {
            const { data } = await detailProduct(id)
            console.log(data);
            
            reset(data)
            
        }
        getProduct()
    },[])

    const onSubmit: SubmitHandler<FormInputs> = data =>{
        onEdit(data)
        console.log(data);
        
        
        
        
    }


  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text"  {...register("name",{required:true})} />
            {errors.name && <span>Không để trống</span> }
            <input type="number" {...register('price',{required: true})} />
            {errors.price && <span>Không để trống</span> }
            <button>Edit</button>
        </form>
    </div>
  )
}

export default ProductEdit