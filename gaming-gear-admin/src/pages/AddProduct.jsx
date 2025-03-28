import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [affiliateLinks, setAffiliateLinks] = useState([{ platform: "", url: "" }]);
  const [message, setMessage] = useState("");

  const handleAffiliateChange = (index, key, value) => {
    const updatedLinks = [...affiliateLinks];
    updatedLinks[index][key] = value;
    setAffiliateLinks(updatedLinks);
  };

  const addAffiliateField = () => {
    setAffiliateLinks([...affiliateLinks, { platform: "", url: "" }]);
  };

  const removeAffiliateField = (index) => {
    const updatedLinks = affiliateLinks.filter((_, i) => i !== index);
    setAffiliateLinks(updatedLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    // ✅ Remove ₹ and commas from price
    const cleanedPrice = price.replace("₹", "").replace(",", "").trim();

    const productData = { name, price: cleanedPrice, image, affiliateLinks };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setName("");
        setPrice("");
        setImage("");
        setAffiliateLinks([{ platform: "", url: "" }]);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to the server.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {message && <p className="mb-4 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        {/* Product Name */}
        <label className="block mb-2 font-semibold">Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Product Price */}
        <label className="block mb-2 font-semibold">Price (₹):</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Product Image URL */}
        <label className="block mb-2 font-semibold">Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Affiliate Links */}
        <label className="block mb-2 font-semibold">Affiliate Links:</label>
        {affiliateLinks.map((link, index) => (
          <div key={index} className="mb-3 flex space-x-2">
            <input
              type="text"
              placeholder="Platform (Amazon, Flipkart, etc.)"
              value={link.platform}
              onChange={(e) => handleAffiliateChange(index, "platform", e.target.value)}
              required
              className="p-2 border rounded-md w-1/3"
            />
            <input
              type="text"
              placeholder="Affiliate Link URL"
              value={link.url}
              onChange={(e) => handleAffiliateChange(index, "url", e.target.value)}
              required
              className="p-2 border rounded-md flex-grow"
            />
            <button
              type="button"
              onClick={() => removeAffiliateField(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAffiliateField}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mb-4"
        >
          ➕ Add More Links
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
