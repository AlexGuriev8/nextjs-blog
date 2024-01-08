import Link from "next/link";
import Image from "next/image";
import { builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const ARTICLES_PER_PAGE = 30;

function Blog({
  articles,
  pageNumber,
}: {
  articles: {
    data: {
      handle: string;
      title: string;
      image: string;
      description: string;
    };
  }[];
  pageNumber: number;
}) {
  console.log(articles);

  return (
    <div>
      {articles.map((item, idx) => (
        <Link href={`/blog/${item.data.handle}`} key={idx}>
          <div style={{ overflow: "hidden", width: 300 }}>
            <div style={{ width: 300, height: 200, display: "block" }}>
              <Image
                width={300}
                height={200}
                src={item.data.image}
                alt="image"
              />
            </div>
            <p> {item.data.title}</p>
            <p> {item.data.description}</p>
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

export async function getStaticProps({ query }: { query: string }) {
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blog-post", {
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

export default Blog;
