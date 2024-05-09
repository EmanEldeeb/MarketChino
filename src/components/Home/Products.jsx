import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Cartbtn from "../Addtocart/Cartbtn";
function fetchAllProducts() {
  return fetch("https://ecommerce.routemisr.com/api/v1/products")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}
function Products() {
  const { data } = useQuery("product/getall", fetchAllProducts);
  console.log(data);
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-4  gap-3">
      {data &&
        data?.data.map((product) => (
          <Link to={""} key={product._id} className="  shadow rounded-sm">
            <li>
              <img src={product.imageCover} alt={product.title} />
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span>{product.title.split(" ", 3).join(" ")}</span>{" "}
                  <span>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-teal-500 font-bold">{product.price}$</p>
                  <Cartbtn></Cartbtn>
                </div>
              </div>
            </li>
          </Link>
        ))}
    </ul>
  );
}

export default Products;
