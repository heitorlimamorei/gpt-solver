export default function RoundedImage({ src, alt }) {
    return (
      <img
        className="h-full w-full"
        src={src}
        alt={alt}
        width="100%"
        height="100%"
      />
    );
  }
  