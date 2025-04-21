// AffiliateLinkManager.jsx
import { useState } from "react";
import axios from "axios";

const AffiliateLinkManager = ({ productId, initialLinks, onUpdate }) => {
  const [links, setLinks] = useState(initialLinks || []);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddLink = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${productId}/affiliate_links`,
        newLink
      );
      setLinks([...links, { ...newLink, id: res.data.id }]);
      setNewLink({ platform: "", url: "" });
      setIsAdding(false);
      onUpdate(); // Refresh parent component if needed
    } catch (error) {
      console.error("Error adding affiliate link:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Affiliate Links</h3>
      <ul className="space-y-1">
        {links.map(link => (
          <li key={link.id} className="flex justify-between">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
      
      {isAdding ? (
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="Platform (e.g., Amazon, Flipkart)"
            value={newLink.platform}
            onChange={(e) => setNewLink({...newLink, platform: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            placeholder="Affiliate URL"
            value={newLink.url}
            onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddLink}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-2 text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
        >
          + Add Affiliate Link
        </button>
      )}
    </div>
  );
};

export default AffiliateLinkManager;