// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   reviews: [],
// };

// export const addReview = createAsyncThunk(
//   "/order/addReview",
//   async (formdata) => {
//     const response = await axios.post(
//       `http://localhost:5000/api/shop/review/add`,
//       formdata
//     );

//     return response.data;
//   }
// );

// export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
//   const response = await axios.get(
//     `http://localhost:5000/api/shop/review/${id}`
//   );

//   return response.data;
// });

// const reviewSlice = createSlice({
//   name: "reviewSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getReviews.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getReviews.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.reviews = action.payload.data;
//       })
//       .addCase(getReviews.rejected, (state) => {
//         state.isLoading = false;
//         state.reviews = [];
//       });
//   },
// });

// export default reviewSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

// ✅ Add Review with Error Handling
export const addReview = createAsyncThunk(
  "review/addReview", // 🔹 Better naming
  async (formdata, { rejectWithValue }) => {
    try {
      console.log("Sending review data:", formdata); // ✅ Log data before sending

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
        formdata
      );

      console.log("Response from server:", response.data); // ✅ Log response
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Get Reviews with Error Handling
export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/review/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload); // ✅ Update state with new review
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add review"; // ✅ Store error message
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.error = null;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload || "Failed to fetch reviews"; // ✅ Store error
      });
  },
});

export default reviewSlice.reducer;
