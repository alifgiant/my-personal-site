import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    console.log(posts);

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
              <article
                className={post.frontmatter.featuredpost ? "is-featured" : ""}
              >
                {/* {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                  </div>
                ) : null} */}
                <div className="post-meta">
                  <span className="uk-text-uppercase uk-text-bold uk-text-emphasis">
                    {post.frontmatter.date}
                  </span>
                  {post.frontmatter.tags.map((tag) => (
                    <Link
                      className="uk-text-uppercase uk-text-bold uk-margin-medium-left"
                      key={tag}
                      to={"/tags/" + tag.toLowerCase()}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div className="uk-text-lead uk-text-bolder">
                  <Link
                    className="uk-text-uppercase uk-text-bold uk-text-emphasis"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                </div>
                <p>
                  {post.frontmatter.description}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
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
                    fluid(maxWidth: 120, quality: 100) {
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
