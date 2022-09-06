import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import database from "../firedb";
import Footer from "../Footer/Footer";

import "./BlogDetails.css";
const BlogDetails = () => {
  const { blogId } = useParams();
  const [blogs, setBlogs] = useState([]);
  // get method start
  useEffect(() => {
    const blogRef = database.ref("Blog");
    blogRef.on("value", (snapshot) => {
      const blogs = snapshot.val();
      const Blogs = Object.values(blogs);
      setBlogs(Blogs);
    });
  }, []);
  const matchedBlog = blogs.find((blog) => blog.id == blogId);

  return (
    <div className="blogDetails-main-container">
      <Container maxWidth="md" className="blog-inner-container">
        <Typography variant="body2" className="blog-details-date">
          {matchedBlog?.date}
        </Typography>
        <Box>
          <Typography variant="h4" className="blog-details-heading">
            {matchedBlog?.title}
          </Typography>
          <Typography variant="h4" className="blog-details-heading img-fluid img-part">
            <img src={matchedBlog?.imgUrl}/>
          </Typography>
          <Typography variant="body1"> <div dangerouslySetInnerHTML={{ __html:  matchedBlog?.content }}></div></Typography>
        </Box>
        <Box className="horizontal-line"></Box>
        <Box className="read-more-return-to-blog-container">
          <Typography variant="caption" className="read-more-text">
            Read more about
            <Typography variant="caption" className="category-name">
              {matchedBlog?.keyword}
            </Typography>
          </Typography>
          <Typography variant="body2" className="return-to-blog-wrapper">
            <Link to="/Blog" className="return-to-blog-link">
              Return to Blog
            </Link>
          </Typography>
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default BlogDetails;
