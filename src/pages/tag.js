import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, useStaticQuery } from "gatsby";
import _ from "lodash";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

class TagRoll extends React.Component {
  render() {
    const tags = this.props.tags;

    if (!tags || tags.length < 1) {
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
                Belum nulis apa apa nih dengan tag,
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
        <div className="uk-section" id="tag-list">
          <div className="uk-container blog" uk-height-viewport="expand: true">
            <div className="uk-flex uk-flex-center uk-flex-wrap uk-flex-middle">
              {/* _.flatten([tags, tags, tags, tags, tags]) */}
              {tags.map((tag) => (
                <span
                  key={tag + `tag`}
                  className="uk-button uk-button-secondary uk-margin-bottom uk-margin-small-bottom"
                  style={{ marginRight: "12px" }}
                >
                  <Link
                    style={{ color: "#FFF", textDecoration: "none" }}
                    to={`/tag/${_.kebabCase(tag)}/`}
                  >
                    {tag}
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

TagRoll.propTypes = {
  tags: PropTypes.array,
};

export default () => {
  const { allMarkdownRemark: result } = useStaticQuery(
    graphql`
      query tagQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  );

  const { edges: posts } = result;

  // Tag pages:
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);

  return <TagRoll tags={tags} />;
};
