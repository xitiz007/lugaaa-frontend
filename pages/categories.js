import Head from "next/head";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { addCategory, updateCategory } from "../utils/crud";
import CircularProgress from "@material-ui/core/CircularProgress";
import Category from "../components/Category";
import UpdateIcon from "@material-ui/icons/Update";
import axios from "../utils/axios";
import Cookie from "js-cookie";

function Categories({categories: productCategories}) {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const [categories, setCategories] = useState(productCategories);
  const [categoryName, setCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  const onEditHandler = (name, id) => {
    setEditCategory(id);
    setCategoryName(name);
  }

  const cancelEdit = () => {
    setEditCategory(null);
    setCategoryName("");
  }

  const onAddCategoryHandler = async () => {
    if (!categoryName.trim())
      return dispatch({
        type: NOTIFY,
        payload: { error: "Category name cannot be empty" },
      });
    dispatch({ type: NOTIFY, payload: { loading: true } });
    const category = { categoryName };
    const accessToken = Cookie.get('accessToken');
    
    const { error, message, category: newCategory } = editCategory
      ? await updateCategory(editCategory, category, accessToken)
      : await addCategory(category, accessToken);

    if (error)
      return dispatch({
        type: NOTIFY,
        payload: { error: message },
      });

    if (editCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category._id !== editCategory ? category : newCategory
        )
      );
    } else {
      setCategories((prev) => [newCategory, ...prev]);
    }

    cancelEdit();

    return dispatch({
      type: NOTIFY,
      payload: { success: message },
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
      <Head>
        <title>Categories</title>
      </Head>
      <h2 className="font-medium tracking-widest text-lg md:text-xl lg:text-2xl">
        Categories
      </h2>
      <div className="max-w-md mx-auto my-2">
        <div className="relative flex items-center w-full h-12 rounded-lg shadow-md focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <IconButton
              title={editCategory ? "Update" : "Add"}
              disabled={notify.loading || false}
              aria-label="add category"
              onClick={onAddCategoryHandler}
            >
              {notify.loading ? (
                <CircularProgress />
              ) : (
                <>
                  {editCategory ? (
                    <UpdateIcon color="primary" />
                  ) : (
                    <AddIcon color="primary" />
                  )}
                </>
              )}
            </IconButton>
          </div>

          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="add category..."
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="max-w-md mx-auto">
        {categories.map((category) => (
          <Category
            setCategories={setCategories}
            cancelEdit={cancelEdit}
            editCategory={editCategory}
            onEdit={onEditHandler}
            key={category._id}
            id={category._id}
            categoryName={category.name}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context)
{
  let categories = [];
  try
  {
    const response = await axios.get("/categories");
    categories = response.data.categories;
  }
  catch(err)
  {
    console.log(err);
  }
  return {
    props: {
      categories
    }
  }
}

export default Categories;
