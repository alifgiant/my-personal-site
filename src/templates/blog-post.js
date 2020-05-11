import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Content, { HTMLContent } from "../utils/content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Layout from "../components/Layout";
import BlogMeta from "../components/BlogMeta";
import NavBar from "../components/NavBar";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  date,
  tags,
  categories,
  title,
  helmet,
  featuredimage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div>
      <NavBar />

      <div className="uk-section" id="blog-list">
        <div className="uk-container blog">
          {helmet || ""}
          <BlogMeta date={date} categories={categories} />
          <div
            className="uk-text-uppercase uk-text-large uk-text-bold"
            style={{
              color: "#0e0e0e",
            }}
          >
            {title}
          </div>
          {featuredimage ? (
            <div className="featured-thumbnail uk-margin-small-top">
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredimage,
                  alt: `featured image thumbnail for post ${title}`,
                }}
              />
            </div>
          ) : null}
          <p>{description}</p>
          <hr />
          <PostContent content={content} />
          {tags && tags.length ? (
            <div className="uk-margin-xlarge-top">
              {tags.map((tag) => (
                <span
                  key={tag + `tag`}
                  className="uk-button uk-button-secondary uk-button-small uk-margin-small-bottom"
                  style={{ marginRight: "12px" }}
                >
                  <Link
                    style={{ color: "#FFF", textDecoration: "none" }}
                    to={`/tag/${kebabCase(tag)}/`}
                  >
                    {tag}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="Blog | %s">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        featuredimage={post.frontmatter.featuredimage}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        categories={post.frontmatter.categories}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
            fluid(
              maxWidth: 1200
              maxHeight: 490
              cropFocus: CENTER
              quality: 100
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
