import { useState } from "react";
import axios from "axios";

const AddProductForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    category_id: '',
    affiliate_links: [{ platform: '', url: '' }]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAffiliateChange = (index, field, value) => {
    const updatedLinks = [...formData.affiliate_links];
    updatedLinks[index][field] = value;
    setFormData(prev => ({ ...prev, affiliate_links: updatedLinks }));
  };

  const addAffiliateLink = () => {
    setFormData(prev => ({
      ...prev,
      affiliate_links: [...prev.affiliate_links, { platform: '', url: '' }]
    }));
  };

  const removeAffiliateLink = (index) => {
    const updatedLinks = formData.affiliate_links.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, affiliate_links: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/add-product', formData);
      setMessage('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        image_url: '',
        category_id: '',
        affiliate_links: [{ platform: '', url: '' }]
      });
    } catch (err) {
      console.error(err);
      setMessage('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {message && (
          <p className={`mb-3 text-center text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.01"
          />

          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="1">Keyboards</option>
            <option value="2">Mice</option>
            <option value="3">Headsets</option>
            <option value="4">Monitors</option>
          </select>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Affiliate Links</h3>
            {formData.affiliate_links.map((link, index) => (
              <div key={index} className="mb-3 space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => handleAffiliateChange(index, 'platform', e.target.value)}
                    placeholder="Platform (e.g., Amazon)"
                    className="flex-1 p-2 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeAffiliateLink(index)}
                    className="bg-red-500 text-white px-2 rounded"
                    disabled={formData.affiliate_links.length <= 1}
                  >
                    ×
                  </button>
                </div>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleAffiliateChange(index, 'url', e.target.value)}
                  placeholder="Affiliate URL"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addAffiliateLink}
              className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
            >
              + Add Another Affiliate Link
            </button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
