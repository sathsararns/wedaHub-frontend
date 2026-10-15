import { Link } from "react-router-dom";
import { ImagePlus } from "lucide-react";

const PREVIEW_LIMIT = 6;

export default function WorkGalleryPreview({ images = [] }) {
  const preview = images.slice(0, PREVIEW_LIMIT);
  const remaining = images.length - PREVIEW_LIMIT;

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Work Gallery</h2>

        {images.length > 0 && (
          <Link
            to="/profile"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Manage
          </Link>
        )}
      </div>

      {preview.length === 0 ? (
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center text-center py-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <ImagePlus size={20} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm">No work photos yet</p>
          <p className="text-blue-600 text-xs font-medium mt-1">
            Add photos to showcase your work
          </p>
        </Link>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {preview.map((image, index) => {
            const isLastTile = index === preview.length - 1 && remaining > 0;

            return (
              <div
                key={image + index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`Work sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {isLastTile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm">
                    +{remaining}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
