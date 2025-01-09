import { Link } from "react-router-dom";
import laptop from "../assets/laptop.jpg";
import phone from "../assets/phone.webp";
import headphone from "../assets/headphone.webp";
import camera from "../assets/camera.jpg";
import speaker from "../assets/speaker.webp";
import printer from "../assets/printer.webp";

const CategoryList = () => {
  const categories = [
    {
      category: "laptop",
      categoryImage:
        laptop,
    },
    {
      category: "phone",
      categoryImage:
        phone,
    },
    {
      category: "headphone",
      categoryImage:
        headphone,
    },
    {
      category: "cemara",
      categoryImage:
        camera,
    },
    {
      category: "speaker",
      categoryImage:
        speaker,
    },
    {
      category: "printer",
      categoryImage:
        printer, 
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center">
        {categories.map((product) => (
          <Link
            to={"/category/" + product.category}
            className="group cursor-pointer"
            key={product.category}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src={product.categoryImage}
                alt={product.category}
                className="h-full object-scale-down mix-blend-multiply group-hover:scale-110 transition-transform"
              />
            </div>
            <p className="text-center text-sm md:text-base capitalize mt-2 text-gray-700 group-hover:text-sky-800">
              {product.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
