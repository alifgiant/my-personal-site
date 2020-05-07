import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export const pageQuery = () => {
  const { page } = graphql`
    query IndexPageBy($id: String!) {
      markdownRemark(id: { eq: $id }) {
        id
        frontmatter {
          title
          description
          date
        }
      }
    }
  `;

  return page;
};

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data);
  return (
    <Layout>
      {/* <SEO title="Home" /> */}
      <h1>{post.frontmatter.title}</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <img
          alt="profile"
          src="https://www.gravatar.com/avatar/6f16a13c13154a4060cd0a9c88e9b078?s=250&d=monsterid&r=g"
        />
      </div>
      <Link to="/go-to-tags">Go to tags</Link>
    </Layout>
  );
};

export default IndexPage;
