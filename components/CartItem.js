import Image from "next/image";
import Link from "next/link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  incrementCartItemCount,
  decrementCartItemCount,
  deleteCartItemCount,
} from "../store/actions";
import { useContext } from "react";
import { DataContext } from "../store/globalState";

function CartItem({
  id,
  title,
  description,
  quantity,
  image,
  gender,
  productSize,
  category,
}) {
  const { state, dispatch } = useContext(DataContext);

  const incrementCount = async () => {
    dispatch(await incrementCartItemCount(state.cart, quantity, id, productSize));
  };

  const decrementCount = () => {
    dispatch(decrementCartItemCount(state.cart, id, productSize));
  };

  const deleteCartItem = () => {
    dispatch(deleteCartItemCount(id, state.cart, productSize._id, productSize.color._id));
  };

  return (
    <div className="my-2 shadow-sm p-2 grid grid-cols-5">
      <Image src={image.url} width={200} height={200} objectFit="contain" />
      <div className="col-span-4 md:col-span-3 mx-5">
        <Link href={`/product/${id}`}>
          <a>
            <p className="text-sm sm:text-base tracking-wide md:text-lg hover:underline font-medium">
              {title}
            </p>
          </a>
        </Link>
        <div className="flex flex-col tracking-wide text-xs md:text-sm lg:text-base font-normal text-gray-700 my-1">
          <p>
            <span className="mr-2">category:</span>
            {category.name}
          </p>
          <p>
            <span className="mr-2">sex: </span>
            {gender}
          </p>
          <p className="flex space-x-3">
            <div>
              <span className="mr-2">size: </span>
              {productSize.size}
            </div>
            <span>|</span>
            <div>
              <span className="mr-2">color: </span>
              {productSize.color.colorName}
            </div>
          </p>
          <p>In stock: {productSize.color.inStock}</p>
        </div>

        <p className="font-medium text-base md:text-lg">
          Rs.{productSize.price}
        </p>
      </div>
      <div className="flex flex-col col-span-5 md:col-span-1 space-y-2 md:my-auto md:justify-self-end">
        <div className="flex items-center mx-auto space-x-2 md:space-x-5 my-2">
          <button onClick={decrementCount} className="incdec">
            -
          </button>
          <span className="text-xs md:text-sm">{quantity}</span>
          <button onClick={incrementCount} className="incdec">
            +
          </button>
        </div>
        <button
          onClick={deleteCartItem}
          className="button"
          title="remove from cart"
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
