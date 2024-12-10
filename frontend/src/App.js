import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true,
  });

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products'); // Call to backend API
      setProducts(data);  // Update the state with fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Create a new product
  const createProduct = async () => {
    console.log(newProduct);
    try {
      const createdProduct = await axios.post('http://localhost:5000/api/products', newProduct);  // Post to backend
      setProducts([...products, createdProduct.data]);  // Update state with the new product
      setNewProduct({
        name: '',
        price: '',
        category: '',
        inStock: true,
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Update a product
  const updateProduct = async (id) => {
    try {
      const updatedData = { ...newProduct, price: newProduct.price + 10 };  // Example update logic
      const updatedProduct = await axios.put(`http://localhost:5000/api/products/${id}`, updatedData);  // Put to backend
      setProducts(products.map((product) => (product._id === id ? updatedProduct.data : product)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);  // Delete from backend
      setProducts(products.filter((product) => product._id !== id));  // Remove product from state
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.category}
            <button onClick={() => updateProduct(product._id)}>Update</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create New Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      />
      <button onClick={createProduct}>Create Product</button>
    </div>
  );
}

export default App;
