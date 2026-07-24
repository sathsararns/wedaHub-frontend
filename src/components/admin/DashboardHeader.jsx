import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        {/* <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-3"
        >
          <ArrowLeft size={20} />

          Back
        </button> */}

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Administration Panel
        </p>

      </div>

    </div>
  );
}