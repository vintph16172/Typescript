import React, { useEffect } from 'react'
import { List, Typography, Row, Col, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux'

import { getCategory,getProductCategory } from '../slice/CategorySlice';
import { Link, useParams } from 'react-router-dom'


const CategoryPage = () => {

    const {product} = useSelector(data => data.category.productCate)
    const categories = useSelector(data => data.category.value)
    const dispatch = useDispatch()
    const { Meta } = Card;
    const { id } = useParams();

    useEffect(() => {

        dispatch(getCategory())
        dispatch(getProductCategory(id))

    }, [id])
    return (
        <Row className="pt-28 ">
            <Col span={6} className="pl-4  ">
                <List

                    bordered
                    dataSource={categories}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> <Link to={`/category/${item._id}`} >{item.name}</Link>
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
                    dataSource={product}

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

export default CategoryPage