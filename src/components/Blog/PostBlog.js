import React, { useState, useRef } from "react";
import { Alert, Box, Button, Container, Grid, Input } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import "./PostBlog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostBlog = () => {
  const [isSubmitted, setSubmitted] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  var database = firebase.database();
  var storage = firebase.storage();

  // --------- Image Part Start ------------

  const handleUpload = (e) => {
    e.preventDefault();
    setSubmitted(false)
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            handleOnClick(url);
          });
      }
    );
  };
  
  // --------- Image Part End ----------

  const handleOnClick = (url) => {

    const setTodo = database.ref("Blog");
    const BlogData = {
      id: uuidv4(),
      title: title,
      content: content,
      imgUrl: url,
      date: date,
      keyword: keyword,
    };
    console.log(BlogData);
    setTodo.push(BlogData).then(
      snapshot => {
        Swal.fire({
          title: "Good Job!",
          text: "Your Blog has successfully posted!",
          type: "success"
        }).then(function () {
          window.location = "/Blog";
        })
      }
    )
    setSubmitted(true);

  };


  const modules = {
    toolbar: [
      // [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link"],
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  // CSS Styles
  const styles = {
    color: "black",
    backgroundColor: "white",
    border: "1px solid",
    height: "200px",

  };


  return (
    <div className="postBlog-main-container">
      <form onSubmit={handleUpload}>
        <Container maxWidth="lg" style={{ height: "100vh" }}>
          <Box
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                className="signUp-form"
                style={{
                  maxWidth: "320px",
                  marginTop: "40px",
                  textAlign: "right",
                }}
              >
                <input
                  type="text"
                  required
                  id="title"
                  name="title"
                  placeholder="Your Blog Title"
                  className="common-input-field name-field"
                  onChange={(e) => setTitle(e.target.value)}
                /> <br /> <br />

                {/* <input
                    type="text"
                    required
                    id="content"
                    name="content"
                    placeholder="Your Blog Content"
                    className="common-input-field email-field "
                    onChange={(e) => setContent(e.target.value)}
                  /> */}



                <ReactQuill
                  required
                  scrollable
                  theme="snow"
                  placeholder="Your Blog Content"
                  modules={modules}
                  style={styles}
                  formats={formats}
                  value={content}
                  onChange={setContent}
                /><br /> <br />


                <input
                  required
                  type="text"
                  id="date"
                  name="date"
                  placeholder="DD/MM/YY"
                  className="common-input-field phone-field "
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  required
                  type="text"
                  id="keyword"
                  name="keyword"
                  placeholder="Your Blog Keywords"
                  className="common-input-field phone-field "
                  onChange={(e) => setKeyword(e.target.value)}
                /> <br /> <br />

                <label htmlFor="contained-button-file">
                  <Input
                    required accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    multiple />
                </label>

                <Button
                  disabled={!isSubmitted}
                  type="submit"
                  variant="contained"
                  className="postBlog-button"

                > {!isSubmitted ?
                  <CircularProgress /> : "POST"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </form>
      <Footer />
    </div>
  );
};

export default PostBlog;
