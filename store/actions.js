import { NOTIFY, ADD_CART, ORDERS, USERS, CATEGORIES } from "./constants";

export const addToCart = async (product, selectedSize, selectedColor, cart) => {
  const item = cart.find(
    (cartItem) =>
      cartItem._id === product._id &&
      cartItem.productSize._id === selectedSize._id &&
      cartItem.productSize.color._id === selectedColor._id
  );
  let quantity = 0;
  if (item) quantity = item.quantity;

  if (selectedColor.inStock < quantity + 1 || selectedColor.inStock === 0) {
    return { type: NOTIFY, payload: { error: "product is out of stock" } };
  }
  const updatedCart = [...cart];
  const index = updatedCart.findIndex(
    (cartItem) =>
      cartItem._id === product._id &&
      cartItem.productSize._id === selectedSize._id &&
      cartItem.productSize.color._id === selectedColor._id
  );
  if (index >= 0) {
    updatedCart[index].quantity += 1;
  } else {
    updatedCart.push({
      _id: product._id,
      title: product.title,
      description: product.description,
      image: product.images[0],
      category: product.category,
      gender: product.gender,
      productSize: {
        _id: selectedSize._id,
        size: selectedSize.size,
        price: selectedSize.price,
        color: {
          _id: selectedColor._id,
          colorName: selectedColor.colorName,
          inStock: selectedColor.inStock
        },
      },
      quantity: 1,
    });
  }
  return { type: ADD_CART, payload: updatedCart };
};

export const incrementCartItemCount = async (
  cart,
  quantity,
  id,
  productSize
) => {
  if (
    productSize.color.inStock < quantity + 1 ||
    productSize.color.inStock === 0
  ) {
    return { type: NOTIFY, payload: { error: "product is out of stock" } };
  }
  const updatedCart = [...cart];
  const index = updatedCart.findIndex(
    (cartItem) => cartItem._id === id && cartItem.productSize._id === productSize._id && cartItem.productSize.color._id === productSize.color._id
  );
  if (index >= 0) {
    updatedCart[index].quantity += 1;
  }
  return { type: ADD_CART, payload: updatedCart };
};

export const decrementCartItemCount = (cart, id, productSize) => {
  const updatedCart = [...cart];
  const index = updatedCart.findIndex(
    (cartItem) =>
      cartItem._id === id &&
      cartItem.productSize._id === productSize._id &&
      cartItem.productSize.color._id === productSize.color._id
  );
  if (index >= 0) {
    updatedCart[index].quantity -= 1;
    if (updatedCart[index].quantity <= 0) {
      return deleteCartItemCount(id, cart, productSize._id, productSize.color._id);
    }
  }
  return { type: ADD_CART, payload: updatedCart };
};

export const deleteCartItemCount = (id, cart, sizeId, colorId) => {
  const updatedCart = [...cart].filter(
    (cartItem) =>
      (cartItem._id !== id ||
      cartItem.productSize._id !== sizeId ||
      cartItem.productSize.color._id !== colorId)
  );
  return { type: ADD_CART, payload: updatedCart };
};

// export const updateOrders = (id, orders, date) => {
//   const updatedOrders = [...orders].map(orderItem => {
//     if(orderItem._id !== id) return orderItem;
//     return { ...orderItem, delivered: true, deliveredOn: date };
//   });
//   return { type: ORDERS, payload: updatedOrders };
// }

// export const updateReceivedOrders = (id, orders) => {
//   const updatedOrders = [...orders].map((orderItem) => {
//     if (orderItem._id !== id) return orderItem;
//     return { ...orderItem, received: true};
//   });
//   return { type: ORDERS, payload: updatedOrders };
// };

// export const deleteOrderState = (id, orders) => {
//   const updatedOrders = orders.filter(order => order._id !== id);
//   return { type: ORDERS, payload: updatedOrders };
// }

// export const updateUsers = (id, users, updatedUser) => {
//   const updatedUsers = [...users].map((user) =>
//     user._id === id ? updatedUser : user
//   );
//   return { type: USERS, payload: updatedUsers };
// }

// export const filterUser = (id, users) => {
//   const updatedUsers = [...users].filter(user => user._id !== id);
//   return { type: USERS, payload: updatedUsers };
// };

// export const appendCategory = (category, categories) => {
//   const updatedCategories = [...categories, category];
//   return { type: CATEGORIES, payload: updatedCategories };
// };

// export const updateDeletedCategory = (id, categories) => {
//   const updatedCategories = [...categories].filter( category => category._id !== id );
//   return { type: CATEGORIES, payload: updatedCategories };
// };

// export const updateEditCategory = (id, updatedCategory, categories) => {
//   const updatedCategories = [...categories].map(
//     (category) => category._id === id ? updatedCategory : category
//   );
//   return { type: CATEGORIES, payload: updatedCategories };
// };


// export const updateOrderToPaid = (id, orders) => {
//   const updatedOrders = orders.map(order => {
//     if(order._id !== id) return order;
//     return {
//       ...order,
//       paid: true
//     }
//   });
//   return { type: ORDERS, payload: updatedOrders }
// }
