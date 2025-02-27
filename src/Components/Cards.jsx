import { useState, useEffect } from "react";
import { baseUrl } from "./baseUrl";

const Card = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      let url = `${baseUrl}`;
      try {
        const result = await fetch(url);
        const data = await result.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
      setLoading(false);
    }

    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={item.image.small}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.price}</p>
                <p className="text-gray-500 text-xs mt-2">Registration ends: {item.registration_end_at}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
