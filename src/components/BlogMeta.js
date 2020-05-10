import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";

const BlogMeta = ({ date, categories }) => {
  return (
    <div>
      <span
        className="uk-text-uppercase uk-text-small"
        style={{
          color: "#1f1f1fs",
        }}
      >
        {date}
      </span>
      {categories.map((category) => (
        <Link
          className="uk-text-uppercase uk-text-small uk-margin-small-left"
          key={category}
          to={"/category/" + kebabCase(category)}
        >
          {kebabCase(category)}
        </Link>
      ))}
    </div>
  );
};

export default BlogMeta;
