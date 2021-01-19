import React from "react"
import Modal from "react-modal"
import "./EditModal.scss"
import { update } from "../services/product"

const EditModal = ({ isOpen, products, setProducts, toggle, productToUpdate }) => {
  const createProduct = (e) => {
    e.preventDefault()
    update({
      id: productToUpdate.id,
      name: e.target[0].value,
      description: e.target[1].value,
    })
      .then((res) => {
        setProducts(products.filter(product => product.id !== res.data.product.id))
        setProducts((products) => [...products, res.data.product])
        toggle()
      })
      .catch((err) => console.log("An error occurred: ", err))
  }
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} className="edit-modal">
      <br />
      <form className="add-form" onSubmit={createProduct}>
        <label>
          New name:&nbsp;
          <input type="text" name="name" />
        </label>
        <br />
        <br />
        <label>
          New description:&nbsp;
          <input type="text" name="description" />
        </label>
        <br />
        <br />
        <input type="submit" value="Update" />
      </form>
    </Modal>
  )
}

export default EditModal
