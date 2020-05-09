import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            site
            author
            motto
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
