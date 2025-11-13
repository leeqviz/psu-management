import { RichText } from "@/components/core/contentful/rich-text";

export const PostBody = ({ post }: any) => {
  const { content } = post.fields;

  return (
    <div className="mx-auto prose">
      <RichText content={content} />
    </div>
  );
};
