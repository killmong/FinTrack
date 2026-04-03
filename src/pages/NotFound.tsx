import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import Button from "../components/common/Button";
import PageWrapper from "../components/common/PageWrapper";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
        {/* Icon */}
        <div className="bg-red-50 dark:bg-red-950 p-5 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Text */}
        <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-2">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page not found
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Action */}
        <Button onClick={() => navigate("/")}>
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
