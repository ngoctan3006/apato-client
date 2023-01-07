import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import AdminPage from '../pages/AdminPage/AdminPage';
import ApartDetail from '../pages/ApartDetailPage/ApartDetail';
import ApartManagement from '../pages/ApartManagement/ApartManagement';
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
          <Route path="apart-detail/:apartId" element={<ApartDetail />} />
          <Route path="post-apart" element={<PostApartPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="edit-post/:apartId" element={<EditPostPage />} />
          <Route path="apart-management" element={<ApartManagement />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
