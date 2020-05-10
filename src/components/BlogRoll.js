import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, useStaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import BlogMeta from "../components/BlogMeta";
import _ from "lodash";

class BlogRoll extends React.Component {
  render() {
    let { edges: posts } = this.props.data.allMarkdownRemark;

    if (this.props.categoryFilter) {
      posts = posts.filter(({ node: post }) => {
        const index = _.findIndex(
          post.frontmatter.categories,
          (o) => _.kebabCase(o) === _.kebabCase(this.props.categoryFilter)
        );

        return index > -1;
      });
    }

    if (this.props.tagFilter) {
      posts = posts.filter(({ node: post }) => {
        const index = _.findIndex(
          post.frontmatter.tags,
          (o) => _.kebabCase(o) === _.kebabCase(this.props.tagFilter)
        );

        return index > -1;
      });
    }

    if (!posts) {
      return (
        <div className="uk-text-center uk-text-large uk-position-center">
          <span role="img" aria-label="Sad emoticon">
            😢{" "}
          </span>
          Belum nulis apa apa nih,
          <br />
          Coba balik lagi besok ya
          <span role="img" aria-label="Excited emoticon">
            {" "}
            😆
          </span>
        </div>
      );
    }

    return (
      <div>
        {posts.map(({ node: post }) => (
          <div key={post.id}>
            <BlogMeta
              date={post.frontmatter.date}
              categories={post.frontmatter.categories}
            />
            <div>
              <Link
                className="uk-text-uppercase uk-text-lead uk-text-bold alif subtitle"
                style={{
                  color: "#0e0e0e",
                }}
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </Link>
            </div>
            {post.frontmatter.featuredpost ? (
              post.frontmatter.featuredimage ? (
                <div className="featured-thumbnail uk-margin-small-top">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null
            ) : null}
            <p>{post.frontmatter.description}</p>
            <div className="uk-margin-large-bottom">
              <Link
                style={{
                  borderRadius: "500px",
                  fontSize: "12px",
                }}
                className="uk-button uk-button-primary uk-button-small"
                to={post.fields.slug}
              >
                Keep Reading →
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  categoryFilter: PropTypes.string,
  tagFilter: PropTypes.string,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default ({ categoryFilter, tagFilter }) => {
  const data = useStaticQuery(
    graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                date(formatString: "DD MMMM YYYY")
                featuredpost
                tags
                categories
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1200, maxHeight: 300, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  return (
    <BlogRoll
      data={data}
      tagFilter={tagFilter}
      categoryFilter={categoryFilter}
    />
  );
};
