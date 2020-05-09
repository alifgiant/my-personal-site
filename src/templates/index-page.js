import React from "react";
// import { Link, graphql } from "gatsby";
import { graphql } from "gatsby";
import { useSiteMetadata } from "../utils/site-meta";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

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
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/socmed/" } }) {
        nodes {
          frontmatter {
            url
            name
            icon
          }
        }
      }
    }
  `;

  return page;
};

const createSocmed = ({ frontmatter: data }) => {
  return (
    <div key={"socmed-" + data.name} className="uk-margin-small-right">
      <a href={data.url}>
        <i className="uk-icon-button" uk-icon={data.icon} />
      </a>
    </div>
  );
};

const IndexPage = ({ data }) => {
  const { author, description, motto } = useSiteMetadata();
  const { markdownRemark: page, allMarkdownRemark: socmed } = data;

  return (
    <Layout>
      <div className="uk-section" id="about">
        <div className="uk-container">
          <div className="uk-flex uk-flex-center uk-flex-wrap">
            <div>
              <img
                data-src="https://www.gravatar.com/avatar/6f16a13c13154a4060cd0a9c88e9b078?s=200&d=monsterid&r=g"
                uk-img=""
                alt="Portfolios"
                width="100"
                height="100"
                className="uk-border-circle"
              />
            </div>
            <div className="alif profile">
              <div className="uk-text-large uk-text-bolder uk-text-center uk-text-left@s alif title">
                {author}
              </div>
              <div className="uk-text-center uk-text-left@s alif subtitle">
                {description}
              </div>
              <div className="uk-text-center uk-text-left@s uk-text-bolder uk-text-italic uk-margin-top alif subtitle">
                {motto}
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-center uk-flex-left@s uk-margin-small-top">
                {socmed.nodes.map((val, i) => createSocmed(val))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-section" id="BLOG">
        <BlogRoll />
      </div>
    </Layout>
  );
};

export default IndexPage;
