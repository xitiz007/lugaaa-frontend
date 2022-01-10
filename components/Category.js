import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { DataContext } from "../store/globalState";
import { useContext, useState } from "react";
import { NOTIFY } from "../store/constants";
import Confirmation from "./Confirmation";
import { deleteCategory } from "../utils/crud";
import ClearIcon from "@material-ui/icons/Clear";
import Cookie from "js-cookie";

function Category({
  onEdit,
  id,
  categoryName,
  editCategory,
  cancelEdit,
  setCategories,
}) {
  const { dispatch } = useContext(DataContext);
  const [removeClicked, setRemoveClicked] = useState(false);

  const onCancelHandler = () => {
    setRemoveClicked(false);
  };

  const editCategoryHandler = () => {
    onEdit(categoryName, id);
  };

  const onRemoveHandler = async () => {
    const {error, message} = await deleteCategory(id, Cookie.get('accessToken'));
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    setCategories(prev => prev.filter(category => category._id !== id));
    dispatch({ type: NOTIFY, payload: { success: message } });
    onCancelHandler();
  };

  return (
    <>
      {removeClicked && (
        <Confirmation
          deleteCategory={true}
          onCancel={onCancelHandler}
          onRemove={onRemoveHandler}
        />
      )}
      <div className="bg-white py-2 px-4 rounded-md flex justify-between items-center shadow-md cursor-pointer md:hover:scale-105 transition transform duration-300 ease-out my-2">
        <h2 className="font-medium tracking-wider text-base md:text-lg">
          {categoryName}
        </h2>
        <div className="flex items-center space-x-1">
          {editCategory === id && (
            <IconButton title="cancel edit" onClick={cancelEdit}>
              <ClearIcon color="secondary" />
            </IconButton>
          )}

          <IconButton onClick={editCategoryHandler}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => setRemoveClicked(true)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Category;
