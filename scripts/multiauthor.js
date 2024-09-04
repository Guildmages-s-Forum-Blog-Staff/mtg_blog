"use strict";

const jsyml = require("js-yaml");
const fs = require("fs");

hexo.extend.helper.register("post_author", function (post_obj) {
  const post = post_obj;
  const post_authors = post.authors;
  if (!post_authors) {
    return;
  }

  const authorDir = hexo.source_dir + "_authors/";

  const authorFiles = fs.readdirSync(authorDir);
  const authorData = [];
  for (const element of authorFiles) {
    const authorFile = element;
    const authorFileData = fs.readFileSync(authorDir + authorFile, "utf8");
    const authorFileJson = jsyml.load(authorFileData);
    authorData.push(authorFileJson);
  }

  // console.log(post_authors.length);
  post.author = "";
  post.avatar = "";
  if (post_authors.length > 1) {
    post.avatar = "/images/logo.jpg";
  } else {
    post.avatar = post_authors[0].avatar;
  }
  for (const p_author of post_authors) {
    const author = authorData.find((a) => a.username === p_author);
    if (author && post.author) {
      post.author = post.author + " & " + author.name;
    } else {
      post.author = author.name;
      if (post_authors.length < 2) {
        post.avatar = author.avatar;
      }
    }
  }

  return post.author;
});

hexo.extend.helper.register("author_url", function (post_obj) {
  const post = post_obj;
  const post_authors = post.authors;
  if (!post_authors || post_authors.length > 1) {
    return;
  }

  const authorDir = hexo.source_dir + "_authors/";
  const authorFiles = fs.readdirSync(authorDir);
  const authorData = [];
  for (const element of authorFiles) {
    const authorFile = element;
    const authorFileData = fs.readFileSync(authorDir + authorFile, "utf8");
    const authorFileJson = jsyml.load(authorFileData);
    authorData.push(authorFileJson);
  }

  for (const p_author of post_authors) {
    const author = authorData.find((a) => a.username === p_author);
    if (author) {
      return author.url;
    }
  }

  return;
});
