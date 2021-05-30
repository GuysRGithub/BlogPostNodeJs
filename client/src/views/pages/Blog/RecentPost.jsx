import Card from "../../components/UI/Card/index.jsx";
import "../../../assets/css/recent_post_style.scss";
import blogPost from "../../../data/blog.json";

import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class RecentPost extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  handleSubmit = (e) => {
    this.props.history.push("/post/" + e.target.id)
  }

  render() {
    return (
      <div style={this.props.style}>
      {blogPost.data.map((post) => (
        <Card key={post.id} style={{ marginBottom: "20px" }}>
          <div className="postImageWrapper">
            <img
              src={require("../../../assets/images/posts/" + post.blogImage)}
              alt="Home ShowPost"
            />
          </div>

          <div className="postContent">
            <span className="feature">{post.blogCategory}</span>
            <h2>{post.blogTitle}</h2>
            <span>
              posted on <strong>{post.postedOn}</strong> by
              <strong>{post.author}</strong>
            </span>
            <p>
              {post.blogText.slice(0, 200) + "..."}
            </p>

            <button onClick={this.handleSubmit} id={post.id}>Read More</button>
          </div>
        </Card>
      ))}
    </div>
    )
  }
}

export default withRouter(RecentPost)