import builder from "@builder.io/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const ARTICLES_PER_PAGE = 30;

function Blog({
  articles,
  pageNumber,
}: {
  articles: any[];
  pageNumber: number;
}) {
  return (
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
      }}
    >
      <h1>Blog</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {articles.map((item, index) => (
          <Link href={`/blog/${item.data.handle}`} key={index}>
            <div style={{ overflow: "hidden", width: 300 }}>
              <div
                style={{
                  display: "block",
                }}
              >
                <Image
                  src={item.data.image}
                  width={300}
                  height={200}
                  style={{
                    objectFit: "cover",
                    width: 300,
                    height: 200,
                  }}
                  alt="item.data"
                />
              </div>
              {item.data.title}
              {item.data.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;

export async function getStaticProps() {
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return { props: { articles, pageNumber } };
}
