import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/globalState";
import Image from "next/image";
import CartItem from "../components/CartItem";
import { getProductDetail, postOrder } from "../utils/crud";
import { ADD_CART, NOTIFY } from "../store/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookie from "js-cookie";

const Cart = ({ user }) => {
  const { state, dispatch } = useContext(DataContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const router = useRouter();

  const getupdatedcart = (
    _id,
    product,
    productSize,
    size,
    color,
    quantity
  ) => ({
    _id,
    title: product.title,
    description: product.description,
    image: product.images[0],
    category: product.category,
    gender: product.gender,
    productSize: {
      _id: productSize._id,
      size: productSize.size,
      price: size.price,
      color: {
        _id: productSize.color._id,
        colorName: productSize.color.colorName,
        inStock: color.inStock,
      },
    },
    quantity,
  });

  useEffect(() => {
    const price = state.cart.reduce((price, cartItem) => {
      const { productSize, quantity } = cartItem;
      return price + productSize.price * quantity;
    }, 0);
    setTotalPrice(price);
  }, [state.cart]);

  useEffect(() => {
    async function updateCart() {
      const updatedCart = [];
      for (const cartItem of state.cart) {
        const { _id, quantity, productSize } = cartItem;
        const product = await getProductDetail(_id);
        if (product) {
          const size = product.productSizes.find(
            (size) => size._id === productSize._id
          );
          const color = size.colors.find(
            (color) => color._id === productSize.color._id
          );
          if (color.inStock < quantity) {
            updatedCart.push(
              getupdatedcart(
                _id,
                product,
                productSize,
                size,
                color,
                color.inStock
              )
            );
          } else {
            updatedCart.push(
              getupdatedcart(_id, product, productSize, size, color, quantity)
            );
          }
        }
      }
      dispatch({ type: ADD_CART, payload: updatedCart });
    }
    if (state.cart.length > 0) updateCart();
  }, []);

  const EmptyCart = () => {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="bg-white p-5 md:p-10 shadow-md rounded-md flex items-center space-x-4 justify-center">
          <div className="relative h-[100px] w-[100px] md:h-[200px] md:w-[200px]">
            <Image
              src="/images/empty-cart.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h5 className="font-medium tracking-wider text-lg md:text-xl">
            Your Cart is empty!
          </h5>
        </div>
      </main>
    );
  };

  const checkoutHandler = async () => {
    setLoading(true);
    const bodyData = { cart: state.cart, address, total: totalPrice };
    const {error, message, orderId} = await postOrder(bodyData, Cookie.get("accessToken"));
    setLoading(false);
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    dispatch({ type: ADD_CART, payload: [] });
    dispatch({ type: NOTIFY, payload: { success: message } });
    router.push(`/order/${orderId}`);
  };

  if (state.cart.length === 0) return <EmptyCart />;
  return (
    <div className="min-h-screen">
      <Head>
        <title>Cart</title>
      </Head>
      <main className="lg:flex max-w-screen-2xl mx-auto space-x-2 bg-white">
        {/* left */}
        <div className="flex-grow mt-1">
          <div className="relative h-[150px] sm:h-[200px] md:h-[300px]">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Image
              src="/images/cartCover.jpg"
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="flex flex-col p-5">
            <h1 className="text-base md:text-lg lg:text-2xl border-b pb-4 font-medium">
              Shopping Basket
            </h1>
            {state.cart.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                quantity={item.quantity}
                image={item.image}
                gender={item.gender}
                category={item.category}
                productSize={item.productSize}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="md:hidden border-b-2 border-gray-100"></div>
        <div className="mt-5 flex flex-col space-y-4 px-10 py-5">
          <h1 className="font-medium tracking-wider text-lg text-center">
            Lugaaa
          </h1>
          <h2 className="whitespace-nowrap">
            Subtotal ({state.cart.length} items):{" "}
            <span className="font-bold tracking-wider">Rs.{totalPrice}</span>
          </h2>
          {!user ? (
            <Link href="/login">
              <button
                role="link"
                className="bg-black text-sm text-white px-3 py-2 rounded-full font-medium tracking-wide hover:bg-gray-700 transition duration-200 ease-out"
              >
                Sign in to checkout
              </button>
            </Link>
          ) : (
            <div>
              <label
                className="block mb-2 text-sm md:text-base font-medium tracking-wider text-gray-700"
                htmlFor="address"
              >
                Shipping Address
              </label>
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="input-box"
                id="address"
                type="text"
                placeholder="Ranipauwa, Pokhara"
              />
              <button
                disabled={loading || address === ""}
                onClick={checkoutHandler}
                role="link"
                className="mt-4 bg-black text-sm md:text-base text-white px-3 py-2 rounded-md font-medium tracking-wide hover:bg-gray-700 transition duration-200 ease-out"
              >
                {loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  "Proceed to checkout"
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
