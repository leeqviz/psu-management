import { PostBody } from "@/components/core/posts/post-body";
import { PostHeader } from "@/components/core/posts/post-header";
import { client } from "@/lib/contentful";

export async function generateStaticParams() {
  const response = await client.getEntries({ content_type: "post" });

  return response.items.map((item) => ({
    slug: item.fields.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const response = await client.getEntries({
    content_type: "post",
    "fields.slug": slug,
  });

  if (response.items.length === 0) {
    return <div>404</div>;
  }

  const post = response.items[0];

  return (
    <section className="section">
      <div className="container">
        <article className="prose mx-auto">
          <PostHeader post={post} />
          <PostBody post={post} />
        </article>
      </div>
    </section>
  );
}
