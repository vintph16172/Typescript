import React, { useEffect } from 'react'
import { List, Typography, Row, Col, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts,getProductsQuery } from '../slice/ProductSlice';
import { getCategory } from '../slice/CategorySlice';
import { Link, useParams,useLocation, useSearchParams } from 'react-router-dom'

const ProductPage = () => {
  const params = useParams()
  console.log("ProductPage-Params", params);
  const products = useSelector(data => data.products.value)
  const productsQuery = useSelector(data => data.products.valueQuery)
  const categories = useSelector(data => data.category.value)
  const dispatch = useDispatch()
  const { Meta } = Card;
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const a = query.getAll(search)
  if(a){
    console.log(a,"a");
    console.log("616516515");
  }else{
    console.log("ádasdasfsaf");
  }

  const price_gte = query.get('price_gte');
  const price_lte = query.get('price_lte');
  console.log(price_gte,price_lte,"param");
  console.log(products,"products");
  console.log(productsQuery,"productsQuery");


  const priceSort = [
    <Link to={`/products?price_gte=${50000}&price_lte=${100000}`} onClick={() =>dispatch(getProductsQuery(`price_gte=${50000}&price_lte=${100000}`))}>50.000 - 100.000</Link>,
    <Link to={`/products?price_gte=${50000}&price_lte=${100000}`} onClick={() =>dispatch(getProductsQuery(`price_gte=${100000}&price_lte=${200000}`))}>100.000 - 200.000</Link>,
    <Link to={`/products?price_gte=${50000}&price_lte=${100000}`} onClick={() =>dispatch(getProductsQuery(`price_gte=${20000}&price_lte=${500000}`))}>200.000 - 500.000</Link>,
    <Link to={`/products?price_gte=${50000}&price_lte=${100000}`} onClick={() =>dispatch(getProductsQuery(`price_gte=${500000}&price_lte=${1000000}`))}>500.000 - 1.000.000</Link>,
  ]

  useEffect(() => {

    dispatch(getCategory())
    dispatch(getProducts())

  }, [])
  return (
    <Row className="pt-28 ">
      <Col span={6} className="pl-4  ">
        <List

          bordered
          dataSource={categories}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item.name}
            </List.Item>
          )}
        />
        <List

          bordered
          dataSource={priceSort}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <List
          grid={{ gutter: 16, sm: 2, md: 4, column: 4 }}

          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 8,
          }}
          dataSource={productsQuery.length !== 0 ? productsQuery : products }

          renderItem={item => (

            <div className="w-full md:w-full p-6 flex flex-col flex-grow flex-shrink">
              <Card
                hoverable
                // style={{ width: 378 }}
                className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                cover={<img className="h-50 " alt="example" src={item.image} />}
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
                    <Link to={`${item._id}`} >
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
      </Col>

    </Row>
  )
}

export default ProductPage