import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context";

const Create = () => {
  const [state, setState] = useState(false);
  const [formdata, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const { post } = useBlog();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const postBlogs = async (e) => {
    e.preventDefault();

    const { title, description } = formdata;

    if (!title && !description) {
      return toast(`Enter both fields`, {
        icon: "😒",
      });
    }

    if (!title) {
      return toast("Enter your topic", {
        icon: "🙄",
      });
    }
    if (!description) {
      return toast("Enter your Description", {
        icon: "🙄",
      });
    }

    if (title && description) {
      try {
        const response = await axios.post(
          `http://localhost:3000/create-blogs`,
          formdata
        );

        if (response.status === 200) {
          toast.success("Blog posted successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }

        if (post.length === 0) {
          toast('Congrats your first blog!', {
            icon: '👏',
          });
        }
      } catch (err) {
        toast.err("An error occured while posting the blog");
        console.log("Error posting blog", err);
      }
    }
  };

  return (
    <div >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:w-[60vw] w-[90%]  mt-[10vw] m-auto text-center">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter topic...."
            className="border w-full border-black md:w-[60vw]  h-[5vh] px-2 rounded-md outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            name="description"
            id=""
            cols="40"
            rows="10"
            placeholder="Start your blogs.."
            className="border border-black md:w-[60vw] w-full mt-2 rounded-md p-2 outline-none"
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          className={` w-full transition-all
         text-white rounded-lg h-[5vh] active:scale-[0.9] text-2xl bg-blue-500`}
          onClick={postBlogs}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
