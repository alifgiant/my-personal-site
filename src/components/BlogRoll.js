import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    console.log(posts);

    if (!posts) return <div></div>;

    return (
      <div className="uk-width-2-4">
        {posts.map(({ node: post }) => (
          <div key={post.id}>
            <article
              className={post.frontmatter.featuredpost ? "is-featured" : ""}
            >
              <div>
                <span
                  className="uk-text-uppercase uk-text-small"
                  style={{
                    color: "#1f1f1fs",
                  }}
                >
                  {post.frontmatter.date}
                </span>
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    className="uk-text-uppercase uk-text-small uk-margin-small-left"
                    key={tag}
                    to={"/tags/" + tag.toLowerCase()}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <div className="uk-margin-small-top">
                <Link
                  className="uk-text-uppercase uk-text-lead uk-text-bold uk-text-bold"
                  style={{
                    color: "#0e0e0e",
                  }}
                  to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
              </div>
              {post.frontmatter.featuredimage ? (
                <div className="featured-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null}
              <p>{post.frontmatter.description}</p>
              <div className="uk-margin-xlarge-bottom">
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
            </article>
          </div>
        ))}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
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
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 200, maxHeight: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
