import React from "react"
import { useState, useEffect } from "react"
import { findAll, deleteProduct } from "../../services/product"
import "./Home.scss"
import AddModal from "../AddModal"
import EditModal from "../EditModal"

const Home = () => {
  const [products, setProducts] = useState([])
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [productToUpdate, setProductToUpdate] = useState(null)

  useEffect(() => {
    async function getProducts() {
      const { data } = await findAll()
      setProducts(data)
    }
    getProducts()
  }, [])

  const deleteHandle = (id) => {
    deleteProduct(id)
      .then((response) => {
        setProducts(products.filter((product) => product.id !== id))
      })
      .catch((err) => console.log(err))
  }

  const addModalToggle = () => {
    setAddModalIsOpen(!addModalIsOpen)
  }

  const editModalToggle = (product) => {
    setEditModalIsOpen(!editModalIsOpen)
    setProductToUpdate(product)
  }

  return (
    <div className="home">
      <div className="home-container">
        {products ? (
          <div className="products-container">
            <div className="products-titles">
              <div className="products-titles-one">
                <b className="product-title">PRODUCT&nbsp;</b>
                <b className="description-title">DESCRIPTION&nbsp;</b>
              </div>
              <i
                className="fa fa-plus icon"
                onClick={() => addModalToggle()}
              ></i>
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
                <div className="icons">
                  <i
                    onClick={() => editModalToggle(product)}
                    className="fas fa-edit"
                  ></i>
                  <i
                    onClick={() => deleteHandle(product.id)}
                    className="fas fa-trash-alt"
                  ></i>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>There are no products in the inventory</h1>
          </div>
        )}
      </div>
      <AddModal
        isOpen={addModalIsOpen}
        toggle={() => addModalToggle()}
        setProducts={setProducts}
      />
      <EditModal
        isOpen={editModalIsOpen}
        toggle={() => editModalToggle()}
        products={products}
        setProducts={setProducts}
        productToUpdate={productToUpdate}
      />
    </div>
  )
}

export default Home
