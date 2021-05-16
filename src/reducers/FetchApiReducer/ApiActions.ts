import axios from "axios";
import { Dispatch } from "redux";

export const DATA_FETCHED = "DATA_FETCHED";
export const ADD_NEW_TAG = "ADD_NEW_TAG";
export const DELETE_CARD = "DELETE_CARD";
export const ADD_NEW_IMAGE = "ADD_NEW_IMAGE";

export type ActionTypes =
  | { type: typeof DATA_FETCHED; payload: [] }
  | { type: typeof ADD_NEW_TAG; payload: string }
  | { type: typeof DELETE_CARD; payload: string }
  | { type: typeof ADD_NEW_IMAGE; payload: [] };

export const getData = async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=80&mime_tpes=&order=Random&si]e=small&page=3&sub _id=demo-ce06ee"
    );
    dispatch({ type: DATA_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const delateCard = (id: string): ActionTypes => ({
  type: DELETE_CARD,
  payload: id,
});
