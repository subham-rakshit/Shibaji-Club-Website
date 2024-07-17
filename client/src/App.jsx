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
  UpdateVideo,
  PostItem,
  VideoItem,
  CreateVideo,
  SearchPage,
  Trials,
  ResetPassword,
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
    <div className="min-h-screen w-screen overflow-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/book-trials" element={<Trials />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/post/:postSlug" element={<PostItem />} />
          <Route path="/video/:videoSlug" element={<VideoItem />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/blogs" element={<Blogs />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin-dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdmiProtectedRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
            <Route path="/update-video/:videoId" element={<UpdateVideo />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
