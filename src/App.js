import React from "react";
import { Route, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Layout from "./shared/Layout";
import ManageSigns from "./features/manage-signs/pages/ManageSigns";
import ManageCategories from "./features/manage-categories/pages/ManageCategories";
import ManageUsers from "./features/manage-users/pages/ManageUsers";
import Profile from "./features/manage-users/pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <MainContent />
          </Layout>
        }
      />
      <Route
        path="/manage-signs"
        element={
          <Layout>
            <ManageSigns />
          </Layout>
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
          <Layout>
            <ManageUsers />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
