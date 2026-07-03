import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">
        Booking Page
      </h1>

      <p className="mt-5">
        Provider ID :
      </p>

      <p className="text-blue-600 font-bold">
        {id}
      </p>
    </div>
  );
}