import { PostCard } from "@/components/core/posts/post-card";
import { client } from "@/lib/contentful";

export default async function PostsPage() {
  const posts = await client.getEntries({
    content_type: "post",
  });
  return (
    <section className="section">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {posts.items.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}
