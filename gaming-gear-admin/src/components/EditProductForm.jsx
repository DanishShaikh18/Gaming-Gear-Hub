import { useState } from "react";

const EditProductForm = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    image_url: product.image_url || "",
    category_id: product.category_id.toString(),
  });
  
  const [affiliateLinks, setAffiliateLinks] = useState(
    product.affiliateLinks || [{ platform: "", url: "" }]
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAffiliateChange = (index, field, value) => {
    const updatedLinks = [...affiliateLinks];
    updatedLinks[index][field] = value;
    setAffiliateLinks(updatedLinks);
  };

  const addAffiliateLink = () => {
    setAffiliateLinks([...affiliateLinks, { platform: "", url: "" }]);
  };

  const removeAffiliateLink = (index) => {
    if (affiliateLinks.length <= 1) return;
    setAffiliateLinks(affiliateLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
            image_url: formData.image_url,
            category_id: parseInt(formData.category_id),
            affiliateLinks: affiliateLinks.filter(link => link.platform && link.url)
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update product");
      
      onUpdate(data);
      setMessage("Product updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {message && (
          <p className={`mb-3 text-center text-sm ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}>
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
            <option value="1">Keyboards</option>
            <option value="2">Mice</option>
            <option value="3">Headsets</option>
            <option value="4">Monitors</option>
          </select>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Affiliate Links</h3>
            {affiliateLinks.map((link, index) => (
              <div key={index} className="mb-3 space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => handleAffiliateChange(index, 'platform', e.target.value)}
                    placeholder="Platform (e.g., Amazon)"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeAffiliateLink(index)}
                    className="bg-red-500 text-white px-2 rounded"
                    disabled={affiliateLinks.length <= 1}
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;