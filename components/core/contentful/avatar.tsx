import ContentfulImage from "./contentful-image";

const Avatar = ({ name, picture }: { name: string; picture: any }) => {
  return (
    <div className="flex items-center">
      <div className="relative w-10 h-10 mr-4">
        <ContentfulImage
          src={picture.fields.file.url}
          layout="fill"
          className="rounded-full m-0"
          alt={name}
        />
      </div>
      <div className="font-semibold">{name}</div>
    </div>
  );
};

export default Avatar;
