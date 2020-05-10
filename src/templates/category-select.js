import React from "react";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import NavBar from "../components/NavBar";

const CategoryPage = ({ path: slug }) => {
  return (
    <Layout>
      <NavBar />
      <div className="uk-section" id="blog-list">
        <div className="uk-container blog">
          <BlogRoll categoryFilter={slug.split("/")[2]} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
