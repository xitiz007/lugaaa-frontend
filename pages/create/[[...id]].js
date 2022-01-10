import { useRouter } from "next/router";
import { DataContext } from "../../store/globalState";
import { useContext, useState, useEffect } from "react";
import { NOTIFY } from "../../store/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import ImageUpload from "../../components/ImageUpload";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  uploadImages,
  createProduct,
  getProductDetail,
  updateProduct,
} from "../../utils/crud";
import { validateProduct } from "../../utils/verifyCredential";
import Cookie from "js-cookie";
import axios from "../../utils/axios";

function Product({categories}) {
  const productSizeSchema = {
    size: "",
    price: 0,
    colors: [
      {
        colorName: "",
        inStock: 0,
        sold: 0,
      },
    ],
  };

  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [editProduct, setEditProduct] = useState(false);
  const [oldImages, setOldImages] = useState([]);
  const [gender, setGender] = useState("");
  const [productSizes, setProductSizes] = useState([{ ...productSizeSchema }]);

  const emptyStates = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setProductSizes([{...productSizeSchema}]);
    setImages([]);
    setOldImages([]);
  };

  const deleteOldImages = () => {
    setOldImages([]);
  };

  const onSubmitHandler = async (event) => {
    dispatch({ type: NOTIFY, payload: { loading: true } });
    const token = Cookie.get('accessToken');
    event.preventDefault();
    try {
      validateProduct(
        title,
        description,
        category,
        images,
        editProduct
      );
    } catch (err) {
      return dispatch({ type: NOTIFY, payload: { error: err.message } });
    }

    const uploadedImages = await uploadImages(images);
    const formData = {
      title,
      description,
      category,
      productSizes,
      gender,
      images: [...oldImages, ...uploadedImages],
    };
    const {error, message} = editProduct
      ? await updateProduct(id, formData, token)
      : await createProduct(formData, token);
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    editProduct
      ? setOldImages([...oldImages, ...uploadedImages])
      : emptyStates();
    editProduct && setImages([]);
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };

  useEffect(() => {
    async function getProduct() {
      const product = await getProductDetail(id);
      if (!product)
        return dispatch({
          type: NOTIFY,
          payload: { error: "failed to load product" },
        });
      setTitle(product.title);
      setDescription(product.description);
      setProductSizes(product.productSizes);
      setCategory(product.category._id);
      setGender(product.gender);
      setEditProduct(true);
      setOldImages(product.images);
    }
    if (id) {
      getProduct();
    } else {
      setEditProduct(false);
    }
  }, [id]);

  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
      <Head>
        <title>Product Manager</title>
      </Head>
      <h2 className="font-medium tracking-widest text-lg md:text-xl lg:text-2xl">
        Create Product
      </h2>
      <hr className="my-4" />
      <div className="flex items-center justify-center">
        <div>
          <form
            onSubmit={onSubmitHandler}
            className="p-4 bg-white rounded-md max-w-md"
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="title"
              >
                Product Title
              </label>
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="input-box"
                id="title"
                type="text"
                placeholder="Product title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="description"
              >
                Product Description
              </label>
              <textarea
                required
                className="input-box"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                id="description"
                cols="30"
                rows="10"
                placeholder="product description..."
              ></textarea>
            </div>

            <div className="mb-4">
              <div className="flex justify-between">
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="selectOption"
                  >
                    Category
                  </label>
                  <select
                    className="px-2 py-1 rounded-md"
                    name="categories"
                    id="selectOption"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="" disabled>
                      Select categories
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        className="text-base tracking-wide"
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="selectOptionGender"
                  >
                    Gender
                  </label>
                  <select
                    className="px-2 py-1 rounded-md"
                    name="categories"
                    id="selectOptionGender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option disabled value="">
                      Select Gender
                    </option>
                    <option className="text-base tracking-wide" value="men">
                      Men
                    </option>
                    <option className="text-base tracking-wide" value="women">
                      Women
                    </option>
                    <option className="text-base tracking-wide" value="unisex">
                      Unisex
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {editProduct && oldImages.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={deleteOldImages}
                  className="p-2 bg-red-500 rounded-md text-white text-sm hover:bg-red-600"
                >
                  Delete old images({oldImages.length})
                </button>
              </div>
            )}
            <div className="mb-4">
              <p className="block mb-2 text-sm font-bold text-gray-700">
                Product images ({images.length})
              </p>
              <ImageUpload setImageHandler={setImages} />
            </div>

            <div className="mb-4">
              {productSizes.map((productSize, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md my-2">
                  <div className="flex justify-between space-x-2 my-3">
                    <div>
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="productSize"
                      >
                        Product Size
                      </label>
                      <input
                        required
                        value={productSize.size}
                        onChange={(event) => {
                          setProductSizes((prevState) => {
                            return prevState.map((productSize, i) => {
                              if (index !== i) return productSize;
                              return {
                                ...productSize,
                                size: event.target.value,
                              };
                            });
                          });
                        }}
                        className="input-box"
                        id="productSize"
                        type="text"
                        placeholder="Product size"
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="productSize"
                      >
                        Product Price
                      </label>
                      <input
                        required
                        value={productSize.price}
                        onChange={(event) => {
                          setProductSizes((prevState) => {
                            return prevState.map((productSize, i) => {
                              if (index !== i) return productSize;
                              return {
                                ...productSize,
                                price: parseInt(event.target.value),
                              };
                            });
                          });
                        }}
                        className="input-box"
                        id="productSize"
                        type="number"
                        placeholder="Product price"
                      />
                    </div>
                    {index !== 0 && (
                      <IconButton
                        title="delete product size"
                        onClick={() => {
                          const temp = [...productSizes];
                          temp.splice(index, 1);
                          setProductSizes(temp);
                        }}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    )}
                  </div>
                  {productSize.colors.map((color, colorIndex) => (
                    <div
                      className="flex justify-between items-center space-x-2 my-2"
                      key={colorIndex}
                    >
                      <div className="colorName">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="color"
                        >
                          Color name
                        </label>
                        <input
                          required
                          value={color.colorName}
                          onChange={(event) => {
                            setProductSizes((prevState) => {
                              return prevState.map((product, i) => {
                                if (index !== i) return product;
                                return {
                                  ...product,
                                  colors: product.colors.map((color, i) => {
                                    if (colorIndex !== i) return color;
                                    return {
                                      ...color,
                                      colorName: event.target.value,
                                    };
                                  }),
                                };
                              });
                            });
                          }}
                          className="input-box"
                          id="color"
                          type="text"
                          placeholder="color name"
                        />
                      </div>
                      <div className="productInStock">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="inStock"
                        >
                          InStock
                        </label>
                        <input
                          required
                          value={color.inStock}
                          onChange={(event) => {
                            setProductSizes((prevState) => {
                              return prevState.map((product, i) => {
                                if (index !== i) return product;
                                return {
                                  ...product,
                                  colors: product.colors.map((color, i) => {
                                    if (colorIndex !== i) return color;
                                    return {
                                      ...color,
                                      inStock: parseInt(event.target.value),
                                    };
                                  }),
                                };
                              });
                            });
                          }}
                          className="input-box"
                          id="inStock"
                          type="number"
                          placeholder="product in stock"
                        />
                      </div>
                      <div className="productSold">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="sold"
                        >
                          Product Sold
                        </label>
                        <input
                          required
                          value={color.sold}
                          onChange={(event) => {}}
                          className="input-box"
                          id="sold"
                          type="number"
                          placeholder="product sold"
                          onChange={(event) => {
                            setProductSizes((prevState) => {
                              return prevState.map((product, i) => {
                                if (index !== i) return product;
                                return {
                                  ...product,
                                  colors: product.colors.map((color, i) => {
                                    if (colorIndex !== i) return color;
                                    return {
                                      ...color,
                                      sold: parseInt(event.target.value),
                                    };
                                  }),
                                };
                              });
                            });
                          }}
                        />
                      </div>
                      {colorIndex !== 0 && (
                        <IconButton
                          title="delete color"
                          onClick={() => {
                            const temp = [...productSizes];
                            const colors = temp[index].colors;
                            colors.splice(colorIndex, 1);
                            temp[index] = {
                              ...temp[index],
                              colors
                            }
                            setProductSizes(temp);
                          }}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      )}
                    </div>
                  ))}
                  <button
                    className="my-2 flex items-center text-sm border p-2 bg-white shadow-sm"
                    onClick={() => {
                      setProductSizes((prevState) => {
                        return prevState.map((product, i) => {
                          if (i !== index) return product;
                          return {
                            ...product,
                            colors: [
                              ...product.colors,
                              {
                                colorName: "",
                                inStock: 0,
                                sold: 0,
                              },
                            ],
                          };
                        });
                      });
                    }}
                  >
                    <AddIcon color="primary" />
                    add more color
                  </button>
                </div>
              ))}
              <div className="my-3 px-2">
                <button
                  className="flex items-center text-sm border p-2 bg-gray-100 shadow-sm hover:bg-gray-200 transition duration-200 ease-out"
                  onClick={() => {
                    setProductSizes((prevState) => [
                      ...prevState,
                      { ...productSizeSchema },
                    ]);
                  }}
                >
                  <AddIcon color="primary" />
                  <span>add new size</span>
                </button>
              </div>
            </div>

            <div className="mb-6 text-center">
              <button
                disabled={notify.loading || false}
                className="w-full tracking-widest px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {notify.loading ? (
                  <CircularProgress />
                ) : editProduct ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context)
{
  let categories = [];
    try {
      const response = await axios.get("/categories");
      categories = response.data.categories;
    } catch (err) {
      console.log(err);
    }
    return {
      props: {
        categories,
      },
    };
}

export default Product;
