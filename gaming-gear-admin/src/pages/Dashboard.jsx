import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default Dashboard;
