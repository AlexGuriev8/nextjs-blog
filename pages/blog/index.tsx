import builder from "@builder.io/react";
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
  console.log(articles[0].data);

  return (
    <div
      style={{
        border: "1px solid #ffff",
      }}
    >
      {articles.map((item, index) => (
        <Link href={`/blog/${item.name}`} key={index}>
          <div style={{ overflow: "hidden", width: 300 }}>
            <div style={{ width: 300, height: 200, display: "block" }}>
              <img src={item.data.image} />
            </div>
            {item.name}
            {item.data.description}
          </div>
        </Link>
      ))}
      <div style={{ padding: 20, width: 300, margin: "auto", display: "flex" }}>
        {pageNumber > 1 && (
          <a href={`/blog/page/${pageNumber - 1}`}>‹ Previous page</a>
        )}

        {articles.length > ARTICLES_PER_PAGE && (
          <a href={`/blog/page/${pageNumber + 1}`}>Next page ›</a>
        )}
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
