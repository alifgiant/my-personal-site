import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";

const BlogMeta = ({ date, tags }) => {
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
      {tags.map((tag) => (
        <Link
          className="uk-text-uppercase uk-text-small uk-margin-small-left"
          key={tag}
          to={"/tags/" + kebabCase(tag)}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default BlogMeta;
