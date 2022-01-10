import { getProductDetail, deleteProduct } from "../../utils/crud";
import Error from "next/error";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addToCart } from "../../store/actions";
import { DataContext } from "../../store/globalState";
import { useContext, useState } from "react";
import Link from "next/link";
import Confirmation from "../../components/Confirmation";
import { NOTIFY } from "../../store/constants";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

function ProductDetail({ product, user }) {
  if (!product) {
    return <Error statusCode={404} />;
  }
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.productSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.productSizes[0].colors[0]);
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();

  const isSelectedSize = (_id) => selectedSize._id === _id;
  const isSelectedColor = (_id) => selectedColor._id === _id;

  const addToCartHandler = async () => {
    dispatch(await addToCart(product, selectedSize, selectedColor, state.cart));
  };

  const AdminButtons = () => (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Link href={`/create/${product._id}`}>
          <a className="button">Edit</a>
        </Link>
        <button onClick={() => setDeleteClicked(true)} className="mt-auto button">Delete</button>
      </div>
    </div>
  );

  const UserButton = () => (
    <button
      onClick={addToCartHandler}
      disabled={selectedColor.inStock === 0}
      className="bg-black text-white px-[24px] py-[18px] rounded-full font-medium text-[16px] tracking-wide hover:bg-gray-700 transition duration-200 ease-out"
    >
      Add to Bag
    </button>
  );

  const {
    _id: id,
    title,
    description,
    category,
    images,
    gender,
    productSizes,
  } = product;

  const onCancel = () => {
    setDeleteClicked(false);
  };

  const onRemove = async () => {
    const {error, message} = await deleteProduct(product._id, Cookie.get('accessToken'));
    onCancel();
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    router.replace('/');
    return dispatch({ type: NOTIFY, payload: { success: message } });
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
      <main className="max-w-screen-2xl mx-auto p-5 md:p-10 grid grid-cols-3 gap-8 bg-[#fff]">
        <div className="col-span-3 md:col-span-2 p-3 rounded shadow-sm">
          <div className="w-full">
            <Carousel
              showStatus={true}
              showIndicators={true}
              showThumbs={true}
              interval={3000}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image.url} loading="lazy" alt={title} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col space-y-3 md:space-y-4 p-3 rounded-md shadow-sm">
          <h1 className="text-[#131921] text-base md:text-lg lg:text-xl font-medium tracking-wide">
            {title}
          </h1>
          <div className="flex flex-col space-y-2 text-xs md:text-sm text-gray-700 tracking-wide font-medium">
            <p className="">
              category: {category.name}
            </p>
            <p className="">
              sex: {gender}
            </p>
            <div className="">
              <h3 className="">
                Description:
              </h3>
              <p className="font-normal leading-5">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 font-medium text-lg md:text-xl lg:text-2xl">
            Rs.{selectedSize.price}
            {selectedColor.inStock === 0 ? (
              <span className="text-red-500 text-sm md:text-base">
                out of stock
              </span>
            ) : (
              <span className="text-sm md:text-base">
                In stock: {selectedColor.inStock}
              </span>
            )}
          </div>
          {user?.role === "admin" && (
            <p className="text-xs font-medium md:text-sm">
              Sold: {selectedColor.sold}
            </p>
          )}

          <div className="border-b-2"></div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm md:text-base tracking-wide font-medium">
              Select Size
            </h3>
            <div className="flex items-center space-x-3 px-2">
              {productSizes.map((productSize, index) => (
                <div
                  className={`${
                    isSelectedSize(productSize._id) && "border-2 border-black"
                  } hover:border-2 hover:border-black border-gray-300 rounded-sm px-2 py-1 cursor-pointer`}
                  onClick={() => {
                    setSelectedSize(productSize);
                    setSelectedColor(productSize.colors[0]);
                  }}
                  key={index}
                >
                  <h4 className="text-sm md:text-base font-medium">
                    {productSize.size}
                  </h4>
                </div>
              ))}
            </div>
            <h3 className="text-sm md:text-base tracking-wide font-medium">
              Select Color
            </h3>
            <div className="flex items-center space-x-3 px-2">
              {selectedSize.colors.map((color, index) => (
                <div
                  className={`${
                    isSelectedColor(color._id) && "border-2 border-black"
                  } hover:border-2 hover:border-black border-2 border-gray-300 rounded-sm px-2 py-1 cursor-pointer`}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                  key={index}
                >
                  <h4 className="text-sm md:text-base font-medium">
                    {color.colorName}
                  </h4>
                </div>
              ))}
            </div>
            <div className="border-b-2"></div>
          </div>
          {user?.role === "admin" ? <AdminButtons /> : <UserButton />}
        </div>
      </main>
    </>
  );
}

export default ProductDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = await getProductDetail(id);
  return {
    props: {
      product
    },
  };
}
