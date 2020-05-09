import React from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";
import { useSiteMetadata } from "../utils/site-meta";
import "../style/my.css";

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
        <meta property="og:image" content={`${withPrefix("/")}favicon.png`} />s
        <script
          defer={true}
          src="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/js/uikit.min.js"
        />
        <script
          defer={true}
          src="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/js/uikit-icons.min.js"
        />
      </Helmet>
      <div>{children}</div>
    </div>
  );
};

export default TemplateWrapper;
