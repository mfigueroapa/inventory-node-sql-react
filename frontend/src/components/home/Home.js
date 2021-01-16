import React from "react"
import { useState, useEffect } from "react"
import { findAll, deleteProduct } from "../../services/product"
import "./Home.scss"

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const { data } = await findAll()
      setProducts(data)
    }
    getProducts()
  }, [])
  console.log(products)

  const deleteHandle = (id) => {
    deleteProduct(id)
      .then((response) => {
        console.log(response)
        setProducts(products.filter(product => product.id !== id))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="home">
      <div className="home-container">
        {products ? (
          <div className="products-container">
            <div className="products-titles">
              <b className="product-title">PRODUCT&nbsp;</b>
              <b className="description-title">DESCRIPTION&nbsp;</b>
            </div>
            {products.map((product) => (
              <div className="products" key={product.id}>
                <div className="product-info">
                  <li>
                    <b className="product-name">{product.name}</b>&nbsp;
                  </li>
                  <li className="product-description">
                    {product.description}&nbsp;
                  </li>
                </div>
                <i
                  onClick={() => deleteHandle(product.id)}
                  className="fas fa-trash-alt"
                ></i>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>There are no products in the inventory</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
