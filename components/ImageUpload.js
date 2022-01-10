import ImageUploading from "react-images-uploading";
import {useState} from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import UpdateIcon from "@material-ui/icons/Update";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";


export default function ImageUpload({ setImageHandler }) {
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    const imageFiles = [];
    imageList.forEach((image) => {
      imageFiles.push(image.file);
    });
    setImageHandler(imageFiles);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
              <IconButton title="add photo" onClick={onImageUpload}>
                <AddAPhotoIcon {...dragProps} color="primary" />
              </IconButton>
              <IconButton title="remove all" onClick={onImageRemoveAll}>
                <ClearIcon color="secondary" />
              </IconButton>
            </div>

            {imageList.map((image, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-50 rounded-md p-2 my-2 hover:bg-gray-100 transition duration-200 ease-out cursor-pointer"
              >
                <img src={image["data_url"]} alt="" width="100" />
                <div className="flex items-center">
                  <IconButton
                    title="change image"
                    onClick={() => onImageUpdate(index)}
                  >
                    <UpdateIcon color="primary" />
                  </IconButton>
                  <IconButton
                    title="remove"
                    onClick={() => onImageRemove(index)}
                  >
                    <DeleteOutlineIcon color="secondary" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
