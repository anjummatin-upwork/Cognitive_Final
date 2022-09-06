import React, { useEffect, useState } from "react";
import "./blog.css";
import { Container, Typography, Grid, Box } from "@material-ui/core";
import { Button } from "@mui/material";
import database from "../firedb";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Footer/Footer";
const Blog = () => {
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [uiBlogs, setUiBlogs] = useState([]);
  const history = useHistory();

  const handleOnChange = (e) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      const newKeyword = checked.filter((item) => item !== e.target.value);
      setChecked(newKeyword);
    } else {
      const newKeyword = [...checked, e.target.value];
      setChecked(newKeyword);
    }
  };

  useEffect(() => {
    let blogDetails = [];
    if (checked.length > 0) {
      checked.forEach((blog) => {
        const item = blogs.filter((blg) => blg.keyword === blog);
        blogDetails = [...blogDetails, ...item];
      });
      setUiBlogs(blogDetails);
    } else {
      setUiBlogs(blogs);
    }
  }, [checked?.length, blogs?.length]);

  useEffect(() => {
    const categories = [];
    console.log(blogs.length);
    blogs.forEach((blog) => {
      const isExist = categories.includes(blog.keyword);
      if (!isExist) {
        categories.push(blog.keyword);
      }
    });
    setUniqueCategory(categories);
  }, [blogs?.length]);

  // get method start

  useEffect(() => {
    const blogRef = database.ref("Blog");
    blogRef.on("value", (snapshot) => {
      const blogs = snapshot.val();
      const Blogs = Object.values(blogs);
      setBlogs(Blogs);
    });
  }, []);

  //handle show blog details

  const handleShowBlogDetails = (id) => {
    history.push(`/blogDetails/${id}`);
  };
  return (
    <>
      {" "}
      <div>
        <Box className="blog-main-container">
          <Container maxWidth="lg">
            <Typography variant="h3" className="blog-top-heading">
              Genetically Blog
            </Typography>

            <Grid container spacing={3} className="main-grid-container">
              <Grid item xs={12} md={9} className="first">
                <Typography
                  variant="body1"
                  className="blog-top-short-description"
                >
                  Quam elementum pulvinar etiam non quam lacus suspendisse.
                  Pharetra et ultrices neque ornare{" "}
                  <a href="/" className="subscribe-link">
                    {" "}
                    subscribe here.
                  </a>{" "}
                </Typography>

                {Object.values(uiBlogs).map((blog, index) => {
                  const { id, title, content, date, keyword, imgUrl } = blog;
                  return (
                    
                    <Box className="blog-container" key={id}>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex">
                          <Typography variant="body2" className="category-tag">
                            {keyword}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" className="category-tag">
                            {" "}
                            {date}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="end"
                      >
                        <Box className="blog-article-left-part blog-article-part">
                          <Typography
                            variant="h5"
                            className="blog-article-heading"
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="blog-article-description"
                          >
                           <div dangerouslySetInnerHTML={{ __html: content.slice(0, 300) + "..." }}></div>
                          </Typography>
                        </Box>
                        <Box className="blog-article-right-part blog-article-part">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              handleShowBlogDetails(id);
                            }}
                          >
                            Reade More
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={3} className="filter-column second">
                <Typography variant="h6" className="filter-heading">
                  {" "}
                  Filter by categories
                </Typography>
                <Box className="checkbox-outer-container">
                  {uniqueCategory.map((value, index) => {
                    return (
                      <Box className="checkbox-inner-container">
                        <label htmlFor={value?.id} className="checkbox-label">
                          <input
                            onChange={(e) => {
                              handleOnChange(e);
                            }}
                            type="checkbox"
                            id={value?.id}
                            value={value}
                          />
                          {value}
                        </label>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
