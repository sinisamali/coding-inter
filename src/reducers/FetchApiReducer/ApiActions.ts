import axios from "axios";
import { Dispatch } from "redux";

export const DATA_FETCHED = "DATA_FETCHED";

export type ActionTypes = { type: typeof DATA_FETCHED; payload: [] };

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
