
import { Route, Routes } from "react-router-dom";
import Calculator from "@/pages/Calculator";
import ToolPage from "@/components/ToolPage";

const ToolRoutes = () => {
  return (
    <Routes>
      {/* Implement the Calculator as a full page */}
      <Route path="/calculator" element={<Calculator />} />
      
      {/* For all other tools, use the dynamic ToolPage */}
      <Route path="/percentage-calculator" element={<ToolPage />} />
      <Route path="/gst-calculator" element={<ToolPage />} />
      <Route path="/emi-calculator" element={<ToolPage />} />
      <Route path="/age-calculator" element={<ToolPage />} />
      <Route path="/date-difference" element={<ToolPage />} />
      <Route path="/profit-loss" element={<ToolPage />} />
      <Route path="/area-calculator" element={<ToolPage />} />
      <Route path="/ecommerce-profit" element={<ToolPage />} />
      <Route path="/gmail-generator" element={<ToolPage />} />
      <Route path="/qr-code-generator" element={<ToolPage />} />
      <Route path="/password-generator" element={<ToolPage />} />
      <Route path="/image-converter" element={<ToolPage />} />
      <Route path="/image-compressor" element={<ToolPage />} />
      <Route path="/word-counter" element={<ToolPage />} />
    </Routes>
  );
};

export default ToolRoutes;
