import "./AddNewImg.css";
import React, { useState, useRef } from "react";
import { ADD_NEW_IMAGE } from "../../reducers/FetchApiReducer/ApiActions";
import { useDispatch } from "react-redux";

const AddNewImg: React.FC<{ data: [] }> = ({ data }) => {
  const inputRef = useRef<any>();
  const dispatch = useDispatch();
  const [newData, setNewData] = useState<any>([]);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (event: any) => {
    const { files } = event.target;

    let nesto: any = [];

    for (const file of files) {
      nesto = [...nesto, { url: await toBase64(file) }];
    }
    setNewData(nesto);
  };

  const [picture, setPicture] = useState("");
  const add_pic = (event: any) => {
    event.preventDefault();
    dispatch({ type: ADD_NEW_IMAGE, payload: newData });
    inputRef.current.value = "";
  };

  return (
    <div className="add-img-div">
      <form onSubmit={add_pic}>
        <input
          onChange={handleChange}
          placeholder="INPUT URL"
          type="file"
          multiple
          name="name"
          ref={inputRef}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddNewImg;
