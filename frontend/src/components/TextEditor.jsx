/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import Upload from "@pages/Upload";

function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let updatedContent = "";
  const [currentId, setCurrentId] = useState();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState("");
  const [getText, setGetText] = useState([]);

  const config = {
    readonly: false,
    height: 400,
    allowResizeX: false,
    allowResizeY: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "brush",
      "|",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "|",
      "symbol",
      "print",
    ],
    buttonsXS: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "brush",
      "|",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "|",
      "symbol",
      "print",
    ],
    controls: {
      font: {
        list: {
          "Montserrat,sans-serif": "Montserrat",
          "Poppins, sans-serif": "Poppins",
        },
      },
    },
  };
  // const handleUpdate = (e) => {
  //   const editorContent = e.target.value;
  //   updatedContent = editorContent;
  // };

  const fetchTextById = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/text/${id}`)
      .then((result) => {
        setCurrentId(result.data.id);
        updatedContent = result.data.body;
        return setContent(result.data.body);
      });
  };
  const fetchAllText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/text?page=${categories}`)
        .then((response) => response.data);
      setGetText(data);
    } catch (err) {
      if (err.sendStatus === 401) {
        // eslint-disable-next-line
        alert("can't fetch anything");
      }
    }
  };
  useEffect(() => {
    fetchAllText();
  }, [categories]);

  const insertTextById = (id) => {
    if (
      confirm(
        "Êtes vous sûr de vouloir soumettre ces modifications? \nCliquer sur OK pour confirmer ou annuler."
      )
    ) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}text/${id}`, {
          body: updatedContent,
        })
        .then((response) => {
          setMessage(response.data);
          setSuccess(true);
        });
      setSuccess(false);
    }
  };

  return (
    <section className="main-section">
      <label className="label-language" htmlFor="textes-languages">
        Selectioner la page à modifier :
        <select
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="home">Acceuil</option>
          <option value="methode">Pratique</option>
          <option value="propos">propos</option>
          <option value="contact">Reserver</option>
        </select>
      </label>
      <div className="button-style">
        {getText.map((allTexts) => (
          <button
            type="button"
            onClick={() => fetchTextById(allTexts.id)}
            className="button-texts"
            key={allTexts.id}
          >
            {allTexts.title}
          </button>
        ))}
      </div>
      <div className="text-editor">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          // onBlur={handleUpdate}
          onChange={(newContent) => {
            updatedContent = newContent;
          }}
        />
      </div>
      <div className="button-container--adminhome">
        <button
          type="button"
          onClick={() => insertTextById(currentId)}
          className="editor-btn"
        >
          Submit
        </button>
        <Upload />
      </div>
    </section>
  );
}

export default TextEditor;
