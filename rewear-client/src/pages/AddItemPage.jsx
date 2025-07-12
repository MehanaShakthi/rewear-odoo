import React, { useState } from 'react';
import '../styles/AddItemPage.css';

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect with backend
    alert('Item listed (dummy)');
    console.log(formData);
  };

  return (
    <div className="add-item-container">
      <h2>Add New Clothing Item</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="dresses">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>

        <label>Type</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} required />

        <label>Size</label>
        <input type="text" name="size" value={formData.size} onChange={handleChange} required />

        <label>Condition</label>
        <select name="condition" value={formData.condition} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="new">New</option>
          <option value="gently used">Gently Used</option>
          <option value="used">Used</option>
        </select>

        <label>Tags (comma-separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />

        <button type="submit" className="btn primary">Submit</button>
      </form>
    </div>
  );
};

export default AddItemPage;
