import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, useStaticQuery } from "gatsby";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

class CategoryRoll extends React.Component {
  render() {
    const categoriesData = this.props.categoriesData;

    if (!categoriesData) {
      return (
        <Layout>
          <NavBar />
          <div className="uk-section" id="tag-list">
            <div
              className="uk-container blog"
              uk-height-viewport="expand: true"
            >
              <div className="uk-text-center uk-text-large uk-position-center">
                <span role="img" aria-label="Sad emoticon">
                  😢{" "}
                </span>
                Belum nulis apa apa nih dengan kategori,
                <br />
                Coba balik lagi besok ya
                <span role="img" aria-label="Excited emoticon">
                  {" "}
                  😆
                </span>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <NavBar />
        <div className="uk-section" id="category-list">
          <div className="uk-container blog" uk-height-viewport="expand: true">
            <div className="uk-flex uk-flex-center uk-flex-wrap">
              {/* _.flatten([tags, tags, tags, tags, tags]) */}
              {categoriesData.map((category) => (
                <span
                  key={category.title + `-category`}
                  className="uk-button uk-button-secondary uk-margin-bottom"
                  style={{ marginRight: "12px" }}
                >
                  <Link
                    style={{ color: "#FFF", textDecoration: "none" }}
                    to={category.slug}
                  >
                    {category.title}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

CategoryRoll.propTypes = {
  categoriesData: PropTypes.array,
};

export default () => {
  const { allMarkdownRemark: result } = useStaticQuery(
    graphql`
      query categoryQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "category-select" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                description
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  const { edges: categories } = result;

  let categoriesData = [];
  categories.forEach(({ node: category }) => {
    categoriesData.push({
      title: category.frontmatter.title,
      slug: category.fields.slug,
    });
  });

  return <CategoryRoll categoriesData={categoriesData} />;
};
