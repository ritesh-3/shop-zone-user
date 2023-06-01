import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../ServerConfigs";

const initialState = {
    isAuthenticated: false,
    loading: false,
    addressLoading: false,
    usersLoading: false,
    error: null,
    successMessage: null,
    user: null,
    users: [],
};

// Load user
export const loadUser = createAsyncThunk(
    "user/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/user/getuser`, {
                withCredentials: true,
            });
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// // Load seller
// export const loadSeller = createAsyncThunk(
//     "user/loadSeller",
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`${server}/shop/getSeller`, {
//                 withCredentials: true,
//             });
//             return data.seller;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );

// Update user information
export const updateUserInformation = createAsyncThunk(
    "user/updateUserInformation",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${server}/user/update-user-info`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                    },
                }
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Update user address
export const updateUserAddress = createAsyncThunk(
    "user/updateUserAddress",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${server}/user/update-user-addresses`,
                data,
                { withCredentials: true }
            );
            return {
                successMessage: "User address updated successfully!",
                user: response.data.user,
            };
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Delete user address
export const deleteUserAddress = createAsyncThunk(
    "user/deleteUserAddress",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${server}/user/delete-user-address/${id}`,
                { withCredentials: true }
            );
            return {
                successMessage: "User deleted successfully!",
                user: response.data.user,
            };
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get all users (admin)
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/user/admin-all-users`, {
                withCredentials: true,
            });
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearMessages: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // .addCase(loadSeller.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(loadSeller.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.user = action.payload;
            // })
            // .addCase(loadSeller.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            .addCase(updateUserInformation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserAddress.pending, (state) => {
                state.addressLoading = true;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.successMessage = action.payload.successMessage;
                state.user = action.payload.user;
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserAddress.pending, (state) => {
                state.addressLoading = true;
            })
            .addCase(deleteUserAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.successMessage = action.payload.successMessage;
                state.user = action.payload.user;
            })
            .addCase(deleteUserAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearErrors, clearMessages } = userSlice.actions;

export const userReducer = userSlice.reducer;