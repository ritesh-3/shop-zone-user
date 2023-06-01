import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../ServerConfigs";


const initialState = {
    isLoading: false,
    products: [],
    error: null
};

// create product
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (productPayload) => {
        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `${server}/product/create-product`,
            productPayload
        );
        return data.product;
    }
);

// get All Products of a shop
export const getAllProductsShop = createAsyncThunk(
    "products/getAllProductsShop",
    async (id) => {
        const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`
        );
        return data.products;
    }
);

// delete product of a shop
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        const { data } = await axios.delete(
            `${server}/product/delete-shop-product/${id}`,
            {
                withCredentials: true,
            }
        );
        return data.message;
    }
);

// get all products
export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async () => {
        const { data } = await axios.get(`${server}/product/get-all-products`);
        return data.products;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.productSuccess = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
                state.productSuccess = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.productSuccess = false;
            })

            
            .addCase(getAllProductsShop.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsShop.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getAllProductsShop.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(deleteProduct.fulfilled, (state) => {
            //     state.isLoading = false;
            // })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedProductId = action.meta.arg;
                state.products = state.products.filter((product) => product._id !== deletedProductId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});


export const productActions = {
    createProduct,
    getAllProductsShop,
    deleteProduct,
    getAllProducts,
  };
  
  export const productReducer = productSlice.reducer;
  

//   How to use 
// import { useDispatch, useSelector } from "react-redux";
// import { productActions } from "./path/to/productSlice";
// const dispatch = useDispatch();
// const handleCreateProduct = async (newForm) => {
//     dispatch(productActions.createProduct(newForm));
//   };

//   const handleGetAllProductsShop = async (id) => {
//     dispatch(productActions.getAllProductsShop(id));
//   };
  
//   const handleDeleteProduct = async (id) => {
//     dispatch(productActions.deleteProduct(id));
//   };
  
//   const handleGetAllProducts = async () => {
//     dispatch(productActions.getAllProducts());
//   };
  
// const handleClearErrors = () => {
//     dispatch(productActions.clearErrors());
//   };
  