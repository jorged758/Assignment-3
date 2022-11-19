const express = require("express");

const route = express.Router();

const BlogController = require("../controllers/blog");

//initializes all crud routes of blog

route.get(`/list`, BlogController.AllBlogs);

route
  .get(`/create_blog_form`, (req, res) => {
    res.render(`Pages/createForm/create`);
  })
  .post(`/create_blog_form`, BlogController.createBlog);

route.get(`/edit_blog_form/:id`, BlogController.GetBlogById);
route.patch(`/update_blog_form/:id`, BlogController.updateBlog);

route.delete(`/delete_blog_form/:id`, BlogController.deleteBlog);

module.exports = route;
