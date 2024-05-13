import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Layout from "./shared/Layout";
import ManageCategories from "./features/manage-categories/pages/ManageCategories";
import ManageUsers from "./features/manage-users/pages/ManageUsers";
import Profile from "./features/manage-users/pages/Profile";
import AddSigns from "./features/manage-signs/pages/AddSigns";
import AddCategory from "./features/manage-categories/pages/AddCategory";
import Login from "./features/authentication/pages/Login";
import { selectIsAuthenticated } from "./features/authentication/slice/authSlice";
import { useSelector } from "react-redux";
import ManageContributedSigns from "./features/manage-signs/pages/ManageContributedSigns";
import ManageSignsAddedByAdmin from "./features/manage-signs/pages/ManageSignsAddedByAdmin";
import UpdateSigns from "./features/manage-signs/pages/UpdateSigns";
import UpdateCategory from "./features/manage-categories/pages/UpdateCategory";
import ManageFeedback from "./features/manage-feedback/pages/ManageFeedback";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout>
              <MainContent />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-feedback"
        element={
          isAuthenticated ? (
            <Layout>
              <ManageFeedback />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-added-signs"
        element={
          isAuthenticated ? (
            <Layout>
              <ManageSignsAddedByAdmin />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-sign-contributed"
        element={
          isAuthenticated ? (
            <Layout>
              <ManageContributedSigns />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/add-sign"
        element={
          isAuthenticated ? (
            <Layout>
              <AddSigns />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/update-sign/:id"
        element={
          isAuthenticated ? (
            <Layout>
              <UpdateSigns />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/add-category"
        element={
          isAuthenticated ? (
            <Layout>
              <AddCategory />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/update-category/:id"
        element={
          isAuthenticated ? (
            <Layout>
              <UpdateCategory />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manage-categories"
        element={
          <Layout>
            <ManageCategories />
          </Layout>
        }
      />
      <Route
        path="/manage-users"
        element={
          isAuthenticated ? (
            <Layout>
              <ManageUsers />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
