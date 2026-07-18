import { useEffect, useState } from "react";
import { searchLocations } from "../../services/locationService";

export default function LocationAutocomplete({
  value,
  handleChange,
}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchLocations(value);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(delay);
  }, [value]);

  const handleSelect = (place) => {
    handleChange({
      target: {
        name: "city",
        value:
          place.properties.city ||
          place.properties.town ||
          place.properties.village ||
          place.properties.name,
      },
    });

    handleChange({
      target: {
        name: "district",
        value: place.properties.county || "",
      },
    });

    setSuggestions([]);
  };

  return (
    <div className="relative">

      <input
        type="text"
        name="city"
        value={value}
        onChange={handleChange}
        placeholder="City / Town"
        className="w-full border rounded-lg p-3"
      />

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto z-50">

          {suggestions.map((item) => (
            <div
              key={item.properties.place_id}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">
                {item.properties.city ||
                  item.properties.town ||
                  item.properties.village ||
                  item.properties.name}
              </div>

              <div className="text-sm text-gray-500">
                {item.properties.county}
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}