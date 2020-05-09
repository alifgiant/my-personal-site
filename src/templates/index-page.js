import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

export const pageQuery = () => {
  const { page } = graphql`
    query IndexPageBy($id: String!) {
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

const createSocmed = ({ icon, name, url }) => {
  return (
    <div key={"socmed-" + name} className="uk-margin-small-right">
      <a href={url}>
        <i className="uk-icon-button" uk-icon={icon} />
      </a>
    </div>
  );
};

const IndexPage = ({ data }) => {
  const { markdownRemark } = data;
  const page = markdownRemark.frontmatter;

  return (
    <Layout>
      <div className="uk-section" id="about">
        <div className="uk-container">
          <div className="uk-flex uk-flex-center uk-flex-wrap">
            <div>
              <img
                data-src={page.image_url}
                uk-img=""
                alt="Portfolios"
                width="100"
                height="100"
                className="uk-border-circle"
              />
            </div>
            <div className="alif profile">
              <div className="uk-text-large uk-text-bolder uk-text-center uk-text-left@s alif title">
                {page.full_name}
              </div>
              <div className="uk-text-center uk-text-left@s alif subtitle">
                {page.description}
              </div>
              <div className="uk-text-center uk-text-left@s uk-text-bolder uk-text-italic uk-margin-top alif subtitle">
                {page.motto}
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-center uk-flex-left@s uk-margin-small-top">
                {page.socmed.map((val, i) => createSocmed(val))}
                <a
                  className="uk-button uk-button-primary"
                  href={page.cv}
                  style={{
                    borderRadius: "500px",
                    height: 38,
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                >
                  Read My CV
                </a>
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
