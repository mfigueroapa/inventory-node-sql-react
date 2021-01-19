import React, { useState } from "react"
import Modal from "react-modal"
import "./AddModal.scss"
import { create } from "../services/product"

const AddModal = ({ isOpen, setProducts, toggle }) => {
  const createProduct = (e) => {
    e.preventDefault()
    create({
      name: e.target[0].value,
      description: e.target[1].value,
    })
      .then((res) => {
        setProducts((products) => [...products, res.data])
        toggle()
      })
      .catch((err) => console.log("An error occurred: ", err))
  }
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} className="add-modal">
      <br />
      <form className="add-form" onSubmit={createProduct}>
        <label>
          Product name:&nbsp;
          <input type="text" name="name" />
        </label>
        <br />
        <br />
        <label>
          Product description:&nbsp;
          <input type="text" name="description" />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </Modal>
  )
}

export default AddModal
