import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  Practices,
  Blogs,
  Contact,
  Login,
  Register,
  Dashboard,
  CreatePost,
  UpdatePost,
  PostItem,
  VideoItem,
  CreateVideo,
  SearchPage,
} from "./pages";

import {
  Header,
  Footer,
  ProtectedRoute,
  OnlyAdmiProtectedRoute,
  ScrollToTop,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:postSlug" element={<PostItem />} />
          <Route path="/video/:videoSlug" element={<VideoItem />} />
          <Route path="/search" element={<SearchPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin-dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdmiProtectedRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
