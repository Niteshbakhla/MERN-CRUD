const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const connedDB = require("./connection");
const blogSchema = require("./models/blogpost");

connedDB();

app.use(express.json());
app.use(cors());

app.post("/create-blogs", async (req, res) => {
  const blogs = new blogSchema({
    title: req.body.title,
    description: req.body.description,
  });

  await blogs.save();
  res.json({ message: "Successfully blogs is posted", blogs });
});
app.get("/get-blogs", async (req, res) => {
  const blogs = await blogSchema.find();
  if (!blogs) res.status(404).json({ message: "no blogs found" });
  res.json({ blogs });
});
app.put("/update-blog/:id", async (req, res) => {
  const blogupdate = await blogSchema.findByIdAndUpdate(req.params.id);

  const { title, description } = req.body;

  if (!title && !description)
    res.json({ message: "Please provide update information" });
  if (!title) blogupdate.description = description;
  if (!description) blogupdate.title = title;
  else {
    blogupdate.title = title;
    blogupdate.description = description;
  }

  await blogupdate.save();
  res.status(200).json({ message: "Blog updated" });
});
app.delete("/delete-blog/:id", async (req, res) => {
  const blogsDelete = await blogSchema.findByIdAndDelete(req.params.id);
  if (!blogsDelete) res.status(404).json({ message: "blogs not found" });
  res.status(200).json({ message: "Deleted Successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});
