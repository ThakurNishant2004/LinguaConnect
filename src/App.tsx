import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ChatInterface } from "./components/ChatInterface";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { AdminDashboard } from "./components/AdminDashboard";
import { HowItWorks } from "./components/HowItWorks";

import {
  Globe,
  MessageSquare,
  BookOpen,
  LayoutDashboard,
  Workflow,
  Menu,
  X,
} from "lucide-react";

type Page = "landing" | "chat" | "knowledge" | "dashboard" | "howitworks";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} />;
      case "chat":
        return <ChatInterface />;
      case "knowledge":
        return <KnowledgeBase />;
      case "dashboard":
        return <AdminDashboard />;
      case "howitworks":
        return <HowItWorks />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  // If landing page, no nav
  if (currentPage === "landing") return renderPage();

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          {/* LEFT LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#007BFF] to-[#00B5AD] rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 font-medium">LinguaConnect</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setCurrentPage("chat")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === "chat"
                  ? "bg-blue-50 text-[#007BFF]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Chat
            </button>

            <button
              onClick={() => setCurrentPage("knowledge")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === "knowledge"
                  ? "bg-blue-50 text-[#007BFF]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Knowledge
            </button>

            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === "dashboard"
                  ? "bg-blue-50 text-[#007BFF]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>

            <button
              onClick={() => setCurrentPage("howitworks")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === "howitworks"
                  ? "bg-blue-50 text-[#007BFF]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Workflow className="w-4 h-4" /> How It Works
            </button>
          </div>

          {/* MOBILE MENU ICON */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileOpen && (
          <div className="sm:hidden absolute top-16 right-0 w-56 bg-white px-2 py-2 space-y-1 rounded-md shadow-lg border border-gray-100">
            <button
              onClick={() => {
                setCurrentPage("chat");
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Chat
            </button>

            <button
              onClick={() => {
                setCurrentPage("knowledge");
                setMobileOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Knowledge Base
            </button>

            <button
              onClick={() => {
                setCurrentPage("dashboard");
                setMobileOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                setCurrentPage("howitworks");
                setMobileOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              How It Works
            </button>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      {renderPage()}
    </div>
  );
}
