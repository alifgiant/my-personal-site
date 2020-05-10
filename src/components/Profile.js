import React from "react";
import PropTypes from "prop-types";

class Profile extends React.Component {
  createSocmed({ icon, name, url }) {
    return (
      <a
        href={url}
        key={"socmed-" + name}
        style={{
          textDecoration: "none",
        }}
        className="uk-margin-small-right uk-icon-button"
      >
        <span className={icon} />
      </a>
    );
  }

  render() {
    const { data } = this.props;
    const page = data.frontmatter;

    return (
      <div className="uk-flex uk-flex-center uk-flex-wrap">
        <div>
          <img
            data-src={page.image_url}
            uk-img=""
            alt="Portfolios"
            width="100"
            height="100"
            className="uk-border-circle"
          />
        </div>
        <div className="alif profile">
          <div className="uk-text-large uk-text-bolder uk-text-center uk-text-left@s alif title">
            {page.full_name}
          </div>
          <div className="uk-text-center uk-text-left@s alif subtitle">
            {page.description}
          </div>
          <div className="uk-text-center uk-text-left@s uk-text-bolder uk-text-italic uk-margin-top alif subtitle">
            {page.motto}
          </div>
          <div className="uk-flex uk-flex-wrap uk-flex-center uk-flex-left@s uk-margin-small-top">
            {page.socmed.map((val, i) => this.createSocmed(val))}
            <a
              className="uk-button uk-button-primary"
              href={page.cv}
              style={{
                borderRadius: "500px",
                height: 38,
                color: "#FFF",
                fontSize: "12px",
              }}
            >
              Read My CV
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default Profile;
