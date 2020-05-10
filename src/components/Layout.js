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
          defer
          src="https://cdn.jsdelivr.net/npm/uikit@3.4.3/dist/js/uikit.min.js"
        />
        <script defer src="https://kit.fontawesome.com/ad68aef9c2.js" />
      </Helmet>
      <div>{children}</div>
      <footer>
        <div className="uk-container blog uk-text-small uk-text-center uk-margin-bottom uk-text-muted	">
          Copyright © 2020 Muhammad Alif Akbar. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default TemplateWrapper;
