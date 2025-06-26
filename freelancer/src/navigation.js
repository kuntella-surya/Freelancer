import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { io } from "socket.io-client";
import { useUnread } from "./UnreadContext";
import { getCurrentUser } from "./getCurrentuser";

import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./Dashboard";
import Profile from "./profile";
import Settings from "./settings";
import Membership from "./Membership";
import ViewProfile from "./viewproflie";
import PostProject from "./postproject";
import MyProjects from "./myprojects";
import FindWork from "./findwork";
import Solutions from "./Solutions";
import HireFreelancer from "./HireFreelancer";
import ProjectDetails from "./projectDetails";
import ProjectProposals from "./ProjectProposals";
import ChatPage from "./chatPage";
import MessagesList from "./MessagesList";
import Notifications from "./notification";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { AiFillHome } from 'react-icons/ai';
import {
  IoPerson,
  IoChatboxEllipses,
  IoNotifications,
} from "react-icons/io5";
import { FaUserTie, FaBriefcase, FaTasks } from "react-icons/fa";
import { MdPostAdd, MdSupportAgent } from "react-icons/md";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

const socket = io("http://localhost:5001");

function Header({ isLoggedIn, onLogout, currentUser, notificationCount }) {
  const { unreadTotal, setUnreadTotal } = useUnread(); // ✅ fix: include setter

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!currentUser?._id) return;

  async function fetchUnread() {
    try {
      const res = await fetch(
        `http://localhost:5001/api/conversations/${currentUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        const total = data.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
        setUnreadTotal(total); // ✅ THIS WAS MISSING!
      }
    } catch (e) {
      console.error("Failed to fetch unread count", e);
    }
  }

  fetchUnread();
  const interval = setInterval(fetchUnread, 5000);
  return () => clearInterval(interval);
}, [currentUser, setUnreadTotal]); // include setter in deps


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand text-warning fw-bold fs-3" to="/">
          Freelance<span className="text-white">Site</span>
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <AiFillHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hirefreelancer">
                <FaUserTie className="me-1" /> Hire
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/findwork">
                <FaBriefcase className="me-1" /> Work
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/solutions">
                <MdSupportAgent className="me-1" /> Solutions
              </Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/myprojects">
                    <FaTasks className="me-1" /> Projects
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/messages">
                    <IoChatboxEllipses className="fs-5 me-1" />
                    Messages
                    {unreadTotal > 0 && (
                      <span className="position-absolute badge bg-danger rounded-pill" style={{ fontSize: '0.65rem' }}>
                        {unreadTotal}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/notifications">
                    <IoNotifications className="fs-5 me-1" />
                    Notifications
                    {notificationCount > 0 && (
                      <span className="position-absolute badge bg-danger rounded-pill" style={{ fontSize: '0.65rem' }}>
                        {notificationCount}
                      </span>
                    )}
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto gap-2">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <IoPerson className="me-1" /> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={() => navigate('/postproject')}>
                    <MdPostAdd className="me-1" /> Post Project
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={onLogout}>
                    <FiLogOut className="me-1" /> Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FiLogIn className="me-1" /> Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <FiUserPlus className="me-1" /> Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function NavWrapper() {
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };
  // fetch current user
useEffect(() => {
  async function loadUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getCurrentUser();
      if (user?._id) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
    setLoadingUser(false); // ✅ Move inside async logic after user is fetched
  }

  loadUser();
}, [location.pathname]);

  console.log("is:",currentUser)
  // socket + notifications
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("register", currentUser._id);
    }

    socket.on("newNotification", () => {
      setNotificationCount((prev) => prev + 1);
    });

    return () => socket.off("newNotification");
  }, [currentUser]);

  if (loadingUser) return <div className="text-center mt-5">Loading...</div>;
  return (
  <>
    <Header
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      currentUser={currentUser}
      notificationCount={notificationCount}
    />
    
    {/* ✅ Only render routes after user is loaded */}
    {!loadingUser && (
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard currentUser={currentUser} /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hirefreelancer" element={<HireFreelancer currentUser={currentUser} />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/postproject" element={<PostProject />} />
        <Route path="/myprojects" element={<MyProjects />} />
        <Route path="/findwork" element={<FindWork />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/project/proposals/:projectId" element={<ProjectProposals />} />
        <Route path="/chat/:otherUserId" element={<ChatPage currentUser={currentUser} />} />
        <Route path="/messages" element={<MessagesList currentUser={currentUser} />} />
        <Route path="/notifications" element={<Notifications setNotificationCount={setNotificationCount} />} />
      </Routes>
    )}
  </>
);

}
