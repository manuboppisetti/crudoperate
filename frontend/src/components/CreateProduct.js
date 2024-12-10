import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/products", {
      name,
      price,
      category,
      inStock,
    }).then(() => alert("Product Created"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <label>
        In Stock:
        <input type="checkbox" onChange={(e) => setInStock(e.target.checked)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
