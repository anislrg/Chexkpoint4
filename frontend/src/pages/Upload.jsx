/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
// eslint-disable-next-line import/no-unresolved
import axios from "@services/axios";
import { useState, useEffect } from "react";
import "../App.css";
import parse from "html-react-parser";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileCreated, setFileCreated] = useState();
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [section, setSection] = useState("");
  const [updateFile, setUpdateFile] = useState();
  const [text, setText] = useState();
  const [textId, setTextId] = useState();
  const [image, setImage] = useState([]);

  // on va specifier que seulement deux types de fichiers peuvent fonctionner
  const handleInput = (e) => {
    const file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      // eslint-disable-next-line
      return alert("Select a jpeg or a png image");
    }
    return setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "pictureData",
      JSON.stringify({
        description,
        categories,
        picSection: section,
      })
    );

    try {
      const { data } = await axios.post("pictures/upload", formData);
      // console.log(data);
      // eslint-disable-next-line no-undef
      setImage([]);
      // eslint-disable-next-line no-undef
      setText();
      return setFileCreated(data);
    } catch (err) {
      console.warn(err);
      // eslint-disable-next-line
      return alert(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "pictureData",
      JSON.stringify({
        description,
        categories,
        text_id: parseInt(textId, 10),
        picSection: section,
      })
    );
    // console.log(text);
    const id = updateFile;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}pictures/update/${id}`,
        formData
      );
      // console.log(data);
      getImage();
      // eslint-disable-next-line no-use-before-define
      getText();
      return setUpdateFile(data);
    } catch (err) {
      console.warn(err);
      // eslint-disable-next-line
      return alert(err.message);
    }
  };

  const getImage = async () => {
    try {
      const data = await axios
        .get(`pictures?categories=${categories}`)
        .then((response) => response.data);
      // console.log(data);
      setImage(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Picture doesn't exists");
      }
    }
  };

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text`)
        .then((response) => response.data);
      // console.log(data);
      setText(data.filter((item) => item.page === "propos"));
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Picture doesn't exists");
      }
    }
  };

  useEffect(() => {
    getImage();
    getText();
  }, [categories]);

  return (
    <form className="upload-container" onSubmit={handleSubmit}>
      <label htmlFor="upload-picture">
        Select a pic :
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleInput}
        />
      </label>
      <label htmlFor="picture-description">
        {" "}
        Picture Description :
        <input
          type="text"
          placeholder="picture description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label htmlFor="picture-categories">
        Select a categorie :
        <select
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="carousel">carousel</option>
          <option value="home">home</option>
          <option value="methode">methode</option>
          <option value="propos">propos</option>
          <option value="contact">contact</option>
        </select>
        {categories === "propos" && (
          <select onChange={(e) => setTextId(e.target.value)}>
            <option value="select">Select</option>
            {text.map((item) => (
              <option value={item.id}>
                {parse(item.title.substring(0, 50))}
              </option>
            ))}
          </select>
        )}
      </label>
      <label htmlFor="picture-section">
        Select a section :
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="select">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>
      <label htmlFor="picture-id">
        <select onChange={(e) => setUpdateFile(e.target.value)}>
          <option value="Select">Select</option>
          {image.length
            ? image.map((img) => (
                <option value={img.id} key={img.id}>
                  {img.file}
                </option>
              ))
            : ""}
        </select>
      </label>

      <button type="submit"> Upload Pic</button>

      {/* <Update /> */}
      {updateFile && (
        <img
          src={`${import.meta.env.VITE_IMAGES_URL}${updateFile.file}`}
          alt={updateFile.alt}
        />
      )}
      <button type="button" onClick={handleUpdate}>
        {" "}
        Update Pic
      </button>
      {fileCreated && (
        <img
          className="upload-image"
          src={`${import.meta.env.VITE_IMAGES_URL}${fileCreated.file}`}
          alt={fileCreated.alt}
        />
      )}
    </form>
  );
}
