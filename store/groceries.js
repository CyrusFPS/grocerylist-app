import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "groceries",
  initialState: {
    list: [],
    loadingGroceries: false,
    loadingAddGrocery: false,
  },
  reducers: {
    groceryRemoved: (groceries, action) => {
      const index = groceries.list.findIndex(
        (grocery) => grocery.id === action.payload.id
      );
      groceries.list.splice(index, 1);
    },
    groceryStatusUpdated: (groceries, action) => {
      const index = groceries.list.findIndex(
        (grocery) => grocery.id === action.payload.id
      );
      groceries.list[index] = {
        ...groceries.list[index],
        inCart: !groceries.list[index].inCart,
      };
    },
    groceriesRequested: (groceries, action) => {
      groceries.loadingGroceries = true;
    },
    groceriesRequestFailed: (groceries, action) => {
      groceries.loadingGroceries = false;
    },
    groceriesRecieved: (groceries, action) => {
      groceries.list = action.payload;
      groceries.loadingGroceries = false;
    },
    groceryAddRequested: (user, action) => {
      console.log("Add Request Began");
    },
    groceryAddSuccess: (user, action) => {
      console.log("Add Success");
      groceries.list.push(action.payload);
    },
    groceryAddFailed: (user, action) => {
      console.log("Add Failed");
    },
  },
});

export const {
  groceryAdded,
  groceryRemoved,
  groceriesRequested,
  groceriesRequestFailed,
  groceriesRecieved,
  groceryAddRequested,
  groceryAddSuccess,
  groceryAddFailed,
  groceryStatusUpdated,
} = slice.actions;
export default slice.reducer;

const url = "/groceries";

export const loadGroceries = (familyId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: url + "/" + familyId,
      method: "get",
      data: familyId,
      onStart: groceriesRequested.type,
      onSuccess: groceriesRecieved.type,
      onError: groceriesRequestFailed.type,
    })
  );
};

export const addGrocery = (grocery) =>
  apiCallBegan({
    url,
    method: "post",
    data: grocery,
    onStart: groceryAddRequested.type,
    onSuccess: groceryAddSuccess.type,
    onError: groceryAddFailed.type,
  });

export const removeGrocery = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "delete",
    data: id,
    onSuccess: userRemoved.type,
  });

export const updateGroceryStatus = (familyId, groceryId) =>
  apiCallBegan({
    url,
    method: "patch",
    data: { familyId, groceryId },
    onSuccess: groceryStatusUpdated.type,
  });

// Selector
export const getGroceries = createSelector(
  (state) => state.entities.groceries,
  (groceries) => groceries.list.filter((grocery) => grocery.id !== -1)
);
