import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useBlog } from "../context";
import ContentEditable from "react-contenteditable";
const Home = () => {
  // const [post, setPost] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);
  const [editable, setEditable] = useState("");

  console.log(updatePost)

  const { post, setPost } = useBlog();

  useEffect(() => {
    getBlogDate();
  }, []);

  const getBlogDate = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/get-blogs");
      setPost(data.blogs);
    } catch (err) {
      console.log(`Problem in fetching data ${err}`);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const deleteBlog = await axios.delete(
        `http://localhost:3000/delete-blog/${id}`
      );

      if (deleteBlog.status === 200) {
        toast.success("Deleted Successfully!");
      }
    } catch (err) {
      console.log("There is somethig issue", err);
      toast.error(`Failed to Delete`);
    }
  };

  const updateBlog = async (id) => {
    console.log(id);
    const updateBlog = await axios.put(
      `http://localhost:3000/update-blog${id}`
    );
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:w-[60%] w-full min-h-[100vh]  m-auto p-6 ">
        {post.map((data) => (
          <div
            key={data._id}
            className="  mb-6 flex items-start flex-col md:flex-row w-[100%] md:text-2xl  md:w-[100%] min-h-[15vh] border border-black rounded-3xl px-4 py-4"
          >
            <div className="w-[90%]">
              <h1
                contentEditable={`${editable === data._id ? "true" : "false"}`}
                className="text-2xl md:text-[2vw] mb-2 font-semibold  "
              >
                {data.title}
              </h1>
              <p
                contentEditable={`${editable === data._id ? "true" : "false"}`}
                className=" text-gray-600"
              >
                {data.description}
              </p>
              <button
                onClick={() => updateBlog(data._id)}
                className={`bg-blue-400 px-2 rounded-md text-white ${
                  editable === data._id && updatePost ? "visible" : "hidden"
                }`}
              >
                save
              </button>
            </div>

            <div className="flex gap-2 mt-4 ">
              <span className="bg-black inline-block p-2 cursor-pointer rounded-lg active:scale-[0.9] ">
                <MdDeleteOutline
                  size={18}
                  color="white"
                  onClick={() => deleteHandler(data._id)}
                />
              </span>
              <span className="bg-black inline-block p-2  rounded-lg cursor-pointer active:scale-[0.9]">
                <FaPencilAlt
                  size={15}
                  color="white"
                  onClick={() => {
                    setEditable(data._id);
                    setUpdatePost(!updatePost)
                  }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
