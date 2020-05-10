import React from "react"
import { Link } from "gatsby"

const BlogPage = () => (
  <div>
    {/* <SEO title="Home" /> */}
    <h1>Hi people category</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <img alt="profile" src="https://www.gravatar.com/avatar/6f16a13c13154a4060cd0a9c88e9b078?s=250&d=monsterid&r=g"/>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default BlogPage