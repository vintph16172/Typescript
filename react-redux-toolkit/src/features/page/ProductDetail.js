import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { detailProduct } from '../../api/product'
import { Image, Carousel, Row, Col, Card, List } from 'antd';
import { changeDetail } from '../slice/ProductSlice';
import { getCategory } from '../slice/CategorySlice';
import { getProducts } from '../slice/ProductSlice';
import { changeCartItem,addItemToCart } from '../slice/CartSlice';
import { Link } from 'react-router-dom'
import { CartLocal } from '../utils/localstorage'

const ProductDetail = () => {
  const products = useSelector(data => data.products.detail)
  const productsArr = useSelector(data => data.products.value)
  const categories = useSelector(data => data.category.value)
  const cart = useSelector(data => data.cart.items)
  const { id } = useParams();
  const dispatch = useDispatch()
  const { Meta } = Card;
  console.log('Detail',cart);

  const productRelate = []
  if (productsArr.length !== 0) {
    const productCate = productsArr.filter(item => item.category == products.category && item.name !== products.name)

    if (productCate.length > 4) {
      for (let index = 0; index < 4; index++) {

        productRelate.push(productCate[index])

      }
    } else {
      for (let index = 0; index < productCate.length; index++) {

        productRelate.push(productCate[index])

      }
    }
  }
  console.log(productRelate);


  useEffect(() => {
    const getProduct = async () => {
      const { data } = await detailProduct(id)
      console.log(data);
      dispatch(changeDetail(data))


    }
    getProduct()
    dispatch(getCategory())
    dispatch(getProducts())
    dispatch(changeCartItem(CartLocal()))
    
  }, [id])

  return (
    <div className="pt-28 ">
      {/* <Row>
        <Col span={12}>
          <Carousel autoplay>
            <div>
              <Image
                width={200}
                src={products.image}
              />
            </div>
            

          </Carousel>
        </Col>
        <Col span={12}>col-12</Col>
      </Row> */}
      <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={products.image} />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{categories.filter(cate => { return cate._id == products.category }).map((item) => { return item.name })}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{products.name}</h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">{products.desc}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                {/* <div class="flex">
                  <span class="mr-3">Color</span>
                  <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div> */}
                {/* <div class="flex ml-6 items-center">
                    <span class="mr-3">Size</span>
                    <div class="relative">
                      <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div> */}
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">{products.price} VNĐ</span>
                <button  onClick={()=> dispatch(addItemToCart(products) )} class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Đặt Mua</button>
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white border-b pb-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
            Sản Phẩm Liên Quan
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={productRelate}
            renderItem={item => (
              <div className="w-full md:w-full p-6 flex flex-col flex-grow flex-shrink">
                <Card
                  hoverable
                  // style={{ width: 378 }}
                  className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                  cover={<img className="h-50" alt="example" src={item.image} />}
                >
                  <Meta title={
                    <div className="w-full font-bold text-xl text-gray-800 px-6">
                      {item.name}
                    </div>
                  } description={
                    <div className="">
                      <p className="text-gray-800 text-base px-6 mb-5">
                        {categories.filter(cate => { return cate._id == item.category }).map((item2) => { return item2.name })}
                      </p>
                      <Link to={`/products/${item._id}`} >
                        <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                          {item.price} VNĐ
                        </button>
                      </Link>
                    </div>
                  }
                  />
                </Card>
              </div>
            )}
          />

          {/* {productRelate?.map((item, index) =>
            <div key={index} className="w-full md:w-full p-6 flex flex-col flex-grow flex-shrink">
              <Card
                hoverable
                // style={{ width: 378 }}
                className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                cover={<img className="h-50" alt="example" src={item.image} />}
              >
                <Meta title={
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    {item.name}
                  </div>
                } description={
                  <div className="">
                    <p className="text-gray-800 text-base px-6 mb-5">
                      {categories.filter(cate => { return cate._id == item.category }).map((item2) => { return item2.name })}
                    </p>
                    <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                      {item.price} VNĐ
                    </button>
                  </div>
                }
                />
              </Card>
            </div>
          )} */}




        </div>
      </section>

    </div>


  )
}

export default ProductDetail