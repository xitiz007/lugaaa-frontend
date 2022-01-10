import Image from "next/image";
import Link from "next/link";
import { DataContext } from "../store/globalState";
import { useContext, useState } from "react";
import { deleteProduct } from "../utils/crud";
import Confirmation from "./Confirmation";
import {NOTIFY} from "../store/constants";
import Cookie from "js-cookie"

function Product({
  id,
  title,
  price,
  description,
  category,
  images,
  gender,
  user,
  setProducts,
}) {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { dispatch } = useContext(DataContext);

  const AdminButtons = () => (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Link href={`/create/${id}`}>
          <a className="button">Edit</a>
        </Link>
        <button
          onClick={() => setDeleteClicked(true)}
          className="mt-auto button"
        >
          Delete
        </button>
      </div>
    </div>
  );

  const onRemove = async () => {
    const { error, message } = await deleteProduct(
      id,
      Cookie.get("accessToken")
    );
    onCancel();
    if (error) return dispatch({ type: NOTIFY, payload: { error: message } });
    setProducts(products => products.filter(product._id !== id));
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };

  const onCancel = () => {
    setDeleteClicked(false);
  };

  return (
    <>
      {deleteClicked && (
        <Confirmation
          deleteProduct={true}
          onCancel={onCancel}
          onRemove={onRemove}
        />
      )}
      <div className="relative shadow-sm hover:shadow-md border border-yellow-100 m-5 bg-white z-30 p-6 transform transition duration-500 ease-out md:hover:scale-105">
        <Link href={`product/${id}/`}>
          <a className="flex flex-col">
            <p className="absolute top-2 right-2 text-xs italic text-gray-500">
              {category?.name}
            </p>
            <Image
              src={images[0].url}
              height={200}
              width={200}
              objectFit="contain"
            />
            <h4 className="my-2 text-sm sm:text-base md:text-lg font-medium tracking-wide hover:underline cursor-pointer">
              {title}
            </h4>
            <p className="text-xs md:text-sm font-normal text-gray-700 line-clamp-2">
              {description}
            </p>
            <p className="text-xs md:text-sm font-normal text-gray-700 my-1">
              {gender}
            </p>
            <div className="mb-1 font-medium text-base md:text-lg">
              Rs.{price}
            </div>
          </a>
        </Link>
        {user && user.role === "admin" && <AdminButtons />}
      </div>
    </>
  );
}

export default Product;
