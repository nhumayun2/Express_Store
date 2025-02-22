const ProductMedia = ({ images, video }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <img
        src={images[0].secure_url}
        alt="Product"
        className="w-full h-auto object-cover rounded-md"
        loading="lazy"
      />

      {video && video.secure_url && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Product Video
          </h3>
          <video controls className="w-full h-auto max-h-96 rounded-md">
            <source src={video.secure_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default ProductMedia;
