import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { convertFloat } from "../slices/transformers"
import { pageProducts } from "../../data"
import { useDispatch } from "react-redux";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //check if item is in the cart and find cart index
      console.log("action called");
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartTotalQuantity += 1;
        1;
        state.cartTotalAmount += convertFloat(state.cartItems[itemIndex].price);
        toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-right",
        });
      } else {
        const product = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(product);
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += convertFloat(product.price);

        toast.success(`Added ${action.payload.name} into cart`, {
          position: "bottom-right",
        });
      }
      //add items to localStorage
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      console.log("cart", JSON.stringify(state));
    },
    increaseQuantity(state, action) {
      console.log("action called");
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += convertFloat(state.cartItems[itemIndex].price);
        toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-right",
        });
      }
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity == 1) {
          console.log("one");
          state.cartItems.splice(itemIndex, 1);
        } else {
          state.cartItems[itemIndex].cartQuantity -= 1;
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= convertFloat(
            state.cartItems[itemIndex].price
          );
          toast.info(`Decreased ${state.cartItems[itemIndex].name} quantity`, {
            position: "bottom-right",
          });
        }
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.info(`cart Cleared`, {
        position: "bottom-right",
      });
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
