import React from "react";
import { Helmet } from "react-helmet";
import { withPrefix, graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            site
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

const TemplateWrapper = ({ children }) => {
  const { title, description, site } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={site} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="blog.blog" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={`${withPrefix("/")}favicon.png`} />
        {/* UIkit CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/css/uikit.min.css"
        />
      </Helmet>
      <div>{children}</div>
      <footer>
        {/* UIkit JS */}
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/js/uikit-icons.min.js"></script>
      </footer>
    </div>
  );
};

export default TemplateWrapper;
