import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch vacancies from API (with Auth)
export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get JWT token from Redux store

      const response = await fetch( `${import.meta.env.VITE_BASE_URL}/api/v1/get-vacancy`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(`Failed to fetch vacancies: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.vacancies || []; // Ensure an array is returned
    } catch (error) {
      return rejectWithValue("An error occurred while fetching vacancies.");
    }
  }
);

// Create a new vacancy (with Auth)
export const createVacancy = createAsyncThunk(
  "vacancies/createVacancy",
  async (vacancyData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get JWT token

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/create-vacancy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify(vacancyData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(`Failed to create vacancy: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      return data; // Expecting the created vacancy object with _id
    } catch (error) {
      return rejectWithValue("An error occurred while creating the vacancy.");
    }
  }
);

// Delete a vacancy (Fixed: Vacancy ID in body + Auth)
export const deleteVacancy = createAsyncThunk(
  "vacancies/deleteVacancy",
  async (vacancyId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get JWT token

      const response = await fetch( `${import.meta.env.VITE_BASE_URL}/api/v1/delete-vacancy`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify({ vacancyId }), // Send vacancyId in body
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(`Failed to delete vacancy: ${errorText || response.statusText}`);
      }

      if (response.status === 204) {
        return { vacancyId, message: "Vacancy deleted successfully" };
      }

      const data = await response.json();
      return { vacancyId, ...data }; // Merge vacancyId with any additional data
    } catch (error) {
      return rejectWithValue(`An error occurred while deleting vacancy: ${error.message}`);
    }
  }
);

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState: {
    vacancies: [],
    status: "idle", // For fetchVacancies
    error: null, // General error state
    createStatus: "idle", // For createVacancy
    deleteStatus: "idle", // For deleteVacancy
    lastDeletedId: null, // Track the last deleted ID
  },
  reducers: {
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.error = null;
      state.lastDeletedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Vacancies
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacancies = action.payload || []; // Ensure vacancies is always an array
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch vacancies";
      })

      // Create Vacancy
      .addCase(createVacancy.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        console.log(action.payload)
        if (action.payload) {
          state.vacancies.push(action.payload); // Add the new vacancy
        }
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload || "Failed to create vacancy";
      })

      // Delete Vacancy (Fixed)
      .addCase(deleteVacancy.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.lastDeletedId = action.payload.vacancyId; // Store the deleted ID
        state.vacancies = state.vacancies.filter(
          (vacancy) => vacancy._id !== action.payload.vacancyId // Remove the vacancy by _id
        );
      })
      .addCase(deleteVacancy.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload || "Failed to delete vacancy";
      });
  },
});

export const { clearCreateStatus, clearDeleteStatus } = vacanciesSlice.actions;

export const selectAllVacancies = (state) => state.vacancies.vacancies;
export const selectVacancyStatus = (state) => state.vacancies.status;
export const selectVacancyError = (state) => state.vacancies.error;
export const selectCreateStatus = (state) => state.vacancies.createStatus;
export const selectDeleteStatus = (state) => state.vacancies.deleteStatus;
export const selectLastDeletedId = (state) => state.vacancies.lastDeletedId;

export default vacanciesSlice.reducer;
