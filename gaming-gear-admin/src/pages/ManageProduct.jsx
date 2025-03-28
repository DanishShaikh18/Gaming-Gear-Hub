import Sidebar from "../components/Sidebar";

const ManageProducts = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold">Manage Products</h2>
      </div>
    </div>
  );
};

export default ManageProducts;
