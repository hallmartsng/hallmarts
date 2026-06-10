import Link from "next/link";
import React from "react";

const Blogs = () => {
  const BLOGS = [
    {
      title: "Why campus buying and selling needs a better solution",
      url: "https://blog.hallmarts.com/blog/why-campus-buying-and-selling-needs-a-better-solution",
    },
  ];
  return (
    <div>
      {BLOGS.map((blog) => {
        return (
          <Link href={blog.url} key={blog.url}>
            {blog.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Blogs;
