export default function ProviderGallery({ images = [] }) {
  if (!images.length) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Work Gallery
        </h2>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            No work images uploaded yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Work Gallery
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow bg-white"
          >
            <img
              src={image}
              alt={`Work ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 duration-300"
            />
          </div>
        ))}

      </div>

    </div>
  );
}