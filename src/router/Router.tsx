import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import AdminPage from '../pages/AdminPage/AdminPage';
import ApartDetailPage from '../pages/ApartDetailPage/ApartDetailPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/LoginPage/Login';
import PostApartPage from '../pages/PostApartPage/PostApartPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="apart-detail/:apartId" element={<ApartDetailPage />} />
          <Route path="post-apart" element={<PostApartPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="edit-post/:apartId" element={<EditPostPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
