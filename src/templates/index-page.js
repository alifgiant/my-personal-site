import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import Profile from "../components/Profile";

export const pageQuery = () => {
  const { page } = graphql`
    query Profile($id: String!) {
      markdownRemark(id: { eq: $id }) {
        id
        frontmatter {
          full_name
          cv
          description
          motto
          image_url
          socmed {
            icon
            name
            url
          }
        }
      }
    }
  `;

  return page;
};

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div className="uk-section" id="about">
        <div className="uk-container">
          <Profile data={data.markdownRemark} />
        </div>
      </div>
      <div className="uk-section" id="blog-list">
        <div className="uk-container">
          <BlogRoll />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
