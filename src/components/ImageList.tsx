interface Props {
  image_urls: string[];
}

const ImageList = ({ image_urls }: Props) => {
  return (
    <div className="grid grid-cols-4 ">
      {image_urls.map((url) => (
        <img
          key={url}
          src={url}
          alt="no image"
          className="aspect-1/1 object-cover h-64"
        />
      ))}
    </div>
  );
};

export default ImageList;
