import { createContext, useContext, useState } from "react";

export const createBlog = createContext();

export const ContextProvider = ({ children }) => {

  const [post, setPost] = useState([]);
  return (
    <createBlog.Provider value={{ post, setPost }}>
      {children}
    </createBlog.Provider>
  );
};


export const useBlog = ()=>{
            return useContext(createBlog);
}

