import { RichText } from "@/components/core/contentful/rich-text";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PostBody = ({ post }: any) => {
  const { content } = post.fields;

  return (
    <div className="mx-auto prose">
      <RichText content={content} />
    </div>
  );
};
