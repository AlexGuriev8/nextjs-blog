import Link from "next/link";
import Image from "next/image";
import { builder } from "@builder.io/react";
import { GetStaticProps } from "next";
import { ReactElement } from "react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface Article {
  data: {
    handle: string;
    title: string;
    image: string;
    description: string;
  };
}

interface BlogProps {
  articles: Article[];
  pageNumber: number;
}

const ARTICLES_PER_PAGE = 30;

function Blog({ articles, pageNumber }: BlogProps): ReactElement {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
        Resources and insights
      </h1>
      <p className="text-center text-lg mb-10">
        The latest industry news, interviews, technologies, and resources.
      </p>

      {/* Search and categories would go here */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, idx) => (
          <Link href={`/blog/${article.data.handle}`} key={idx}>
            <div className="block p-4 hover:bg-gray-100 transition duration-300 ease-in-out">
              <div className="mb-4">
                <Image
                  width={450}
                  height={250}
                  objectFit="cover"
                  src={article.data.image}
                  alt={article.data.title}
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {article.data.title}
              </h2>
              <p className="text-gray-600">{article.data.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination would go here */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageNumber = 1;
  const articles = await builder.getAll("blog-post", {
    options: { includeRefs: true },
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return { props: { articles, pageNumber } };
};

export default Blog;
