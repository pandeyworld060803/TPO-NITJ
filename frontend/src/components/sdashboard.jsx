import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { RiMenuFold3Fill, RiMenuFold4Fill } from "react-icons/ri";
import {
  faHome,
  faBriefcase,
  faClipboard,
  faComments,
  faEnvelope,
  faHandsHelping,
  faShareSquare,
  faCalendar,
  faNoteSticky,
  faHammer,
  faBook,
  faCheckSquare
} from "@fortawesome/free-solid-svg-icons";

import { Menu, X, LogOut } from "lucide-react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./StudentDashboard/home";
import JobApplications from "./StudentDashboard/jobprofile";
import Interviews from "./StudentDashboard/interviews";
import GD from "./StudentDashboard/gd";
// import MailboxComponent from "./StudentDashboard/mailbox";
import OnlineAssessment from "./StudentDashboard/oa";
import PDFDownloadCards from "./StudentDashboard/policy";
import CalendarComponent from "./StudentDashboard/calender";
import SharedExperience from "./StudentDashboard/shared-experience";
import Profile from "./StudentDashboard/profile";
import ProfileImage from "../assets/chillguy.png";
import NITJlogo from "../assets/nitj-logo.png";
import Request from "./StudentDashboard/Request";
import TeamSection from "./Developers/TeamSection.jsx";
import ResumeBuilder from "./StudentDashboard/resume.jsx";
import ChangePasswordForm from "./changepass.jsx";
import Others from "./StudentDashboard/others.jsx";
import QuestionBank from "./StudentDashboard/questionbank.jsx";
import MockAssessmentStudentDashboard from "./StudentDashboard/mockassessment.jsx";
import AssessmentAttempt from "./StudentDashboard/assessmentattempt.jsx";


const StudentDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("/home");

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarExpanded(false);
        setIsMenuOpen(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Error during logout:", error.response?.data || error);
    }
  };

  const menuItems = [
    { path: "/sdashboard/home", label: "Home", icon: faHome },
    {
      path: "/sdashboard/job-application",
      label: "Job Application",
      icon: faBriefcase,
    },
    { path: "/sdashboard/oa", label: "OA", icon: faClipboard },
    { path: "/sdashboard/interviews", label: "Interview", icon: faComments },
    { path: "/sdashboard/gd", label: "GD", icon: faComments },
    { path: "/sdashboard/others", label: "Others", icon: faClipboard },
    { path: "/sdashboard/calendar", label: "Calendar", icon: faCalendar },
   /* { path: "/sdashboard/mailbox", label: "Mailbox", icon: faEnvelope }, */
    {
      path: "/sdashboard/request-help",
      label: "Request Help",
      icon: faHandsHelping,
    },
    {
      path: "/sdashboard/shared-experience",
      label: "Shared Experience",
      icon: faShareSquare,
    },
    {
      path: "/sdashboard/question-bank",
      label: "Question Bank",
      icon: faBook,
    },
    {
      path: "/sdashboard/mock-assessment",
      label: "Mock Assessment",
      icon: faCheckSquare,
    },
/*     { path: "/sdashboard/policy-guidlines", label: "Policy & Guidlines", icon: faNoteSticky },
/*     { path: "/sdashboard/resume", label: "Resume", icon: faNoteSticky }, */
    { path: "/sdashboard/change-pass", label: "Change Password", icon: faHammer },
  ];

  const MenuItem = ({ item, onClick, isSidebarExpanded }) => {
    const isMobileView = window.innerWidth < 768; // Check for mobile view

    return (
      <button
        onClick={() => {
          navigate(item.path);
          onClick?.();
        }}
        className={`flex items-center ${
          !isMobileView && !isSidebarExpanded ? "justify-center " : ""
        } w-full mt-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
          location.pathname === item.path
            ? "bg-custom-blue text-white"
            : "text-gray-600 hover:bg-blue-50"
        }`}
      >
        {/* Always show icon */}
        <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />

        {/* Show label if it's mobile view OR sidebar is expanded */}
        {(isMobileView || isSidebarExpanded) && (
          <span className="ml-3">{item.label}</span>
        )}
      </button>
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <img
              onClick={() => navigate("/sdashboard/home")}
              src={NITJlogo}
              alt="Logo"
              className="h-10 w-10 object-contain rounded"
            />
            {isSidebarExpanded && (
              <h1 className="absolute ml-14 left-4 top-1/2 transform -translate-y-1/2 font-bold text-2xl sm:text-1xl lg:text-2xl tracking-wide w-max">
                TPO-
                <span className="bg-custom-blue text-transparent bg-clip-text">
                  NITJ
                </span>
              </h1>
            )}
          </div>

          {isMobile ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <RiMenuFold3Fill size={20} className="w-6 h-6" />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-bold tracking-wide">👋 Hi, <span className="text-custom-blue">{userData.name}</span> </span>
              <img
                onClick={() => navigate("/sdashboard/profile")}
                src={`${import.meta.env.REACT_APP_BASE_URL}${userData?.image}`|| ProfileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-white z-40">
            <div className="flex flex-col h-full">
              <div className="flex items-center p-4 border-b">
                <img
                  src={userData?.image || ProfileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/sdashboard/profile");
                  }}
                  className="ml-3"
                >
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isSidebarExpanded={true}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </nav>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-4 text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <>
          <aside
            className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
              isSidebarExpanded ? "w-64" : "w-16"
            }`}
          >
            <nav className="p-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isSidebarExpanded={isSidebarExpanded}
                />
              ))}
              <button
                onClick={handleLogout}
                className={`flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg ${
                  !isSidebarExpanded ? "justify-center" : ""
                }`}
              >
                <LogOut className="w-5 h-5" />
                {/* Conditionally render the label only when the sidebar is expanded */}
                {isSidebarExpanded && <span className="ml-3">Logout</span>}
              </button>
            </nav>
          </aside>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`fixed top-16 bg-white rounded-r p-2 shadow-md transition-all duration-300 hover:bg-gray-100 ${
              isSidebarExpanded ? "left-64" : "left-16"
            }`}
          >
            {isSidebarExpanded ? (
              <RiMenuFold3Fill size={20} />
            ) : (
              <RiMenuFold4Fill size={20} />
            )}
          </button>
        </>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 mt-16 transition-all duration-300 ${
          !isMobile ? (isSidebarExpanded ? "ml-64" : "ml-16") : ""
        }`}
      >
        <div className="container mx-auto p-4 min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]">
          {/* Placeholder for route content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="job-application" element={<JobApplications />} />
            <Route path="oa" element={<OnlineAssessment />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="gd" element={<GD />} />
            <Route path="others" element={<Others />} />
            <Route path="calendar" element={<CalendarComponent />} />
            {/* <Route path="mailbox" element={<MailboxComponent />} /> */}
            <Route path="shared-experience" element={<SharedExperience />} />
            <Route path="question-bank" element={<QuestionBank />} />
            <Route path="mock-assessment" element={<MockAssessmentStudentDashboard/>} />
     {/*        <Route path="assessment-attempt/:attemptId" element={<AssessmentAttempt/>} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="request-help" element={<Request />} />
            <Route path="policy-guidlines" element={<PDFDownloadCards />} />
            <Route path="team" element={<TeamSection />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="change-pass" element={<ChangePasswordForm />} />
            </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-slate-800 text-white p-4">
          <div className="container mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="text-sm">
                © Copyright 2022, All Rights Reserved NIT Jalandhar
              </span>
              <span 
                onClick={() => {
                  navigate("/team")
                  onClick?.();
                }}
                className="cursor-pointer">
                Developed by <span className="text-yellow-300 hover:text-yellow-400">Placement Portal Dev Team</span>
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};


export default StudentDashboard;
