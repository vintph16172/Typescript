import React, { useState } from 'react'

type Props = {}

const ProductPage = (props: Props) => {
    const [products, setProducts] = useState([
        { id: 1, name: "product 1" },
        { id: 2, name: "product 2" },
        { id: 3, name: "product 3" },
        { id: 4, name: "product 4" }
    ])
    return (

        <div className="">
            <h1 className="text-3xl font-bold underline">
               Product Page
            </h1>

            <div className="grid grid-cols-4 gap-4">
                {products.map(item => <div className="product-div">{item.id} - {item.name}</div>)}
            </div>
            

        </div>

    )
}

export default ProductPage