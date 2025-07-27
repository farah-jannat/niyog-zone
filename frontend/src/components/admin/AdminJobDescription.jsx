// import React, { useEffect, useRef } from "react";
// // import "./JobDescription.css"; // Ensure this path is correct if you have a separate CSS file

// const AdminJobDescription = ({ onDescriptionChange, initialContent = "" }) => {
//   const editorRef = useRef(null);
//   const quillInstance = useRef(null);
//   const scriptLoaded = useRef(false); // New ref to track if Quill script is loaded

//   useEffect(() => {
//     // Prevent re-initialization if the script is already handled
//     if (scriptLoaded.current) {
//       return;
//     }
//     // Dynamically load Quill's stylesheet
//     const link = document.createElement("link");
//     link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);

//     // Dynamically load Quill's JavaScript library
//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
//     script.onload = () => {
//       if (editorRef.current && !quillInstance.current) {
//         quillInstance.current = new window.Quill(editorRef.current, {
//           theme: "snow",
//           modules: {
//             toolbar: [
//               // You can customize the toolbar here
//               [{ header: [1, 2, false] }],
//               ["bold", "italic", "underline", "strike"],
//               [{ list: "ordered" }, { list: "bullet" }],
//               [{ indent: "-1" }, { indent: "+1" }],
//               ["link", "image"],
//               ["clean"],
//             ],
//           },
//         });

//         // Set initial content if provided
//         if (initialContent) {
//           try {
//             const delta =
//               quillInstance.current.clipboard.convert(initialContent);
//             quillInstance.current.setContents(delta);
//           } catch (e) {
//             console.error("Error setting initial Quill content:", e);
//             quillInstance.current.setText(initialContent); // Fallback to plain text
//           }
//         }

//         // Add event listener for text changes
//         quillInstance.current.on("text-change", () => {
//           // Get the HTML content
//           const htmlContent = quillInstance.current.root.innerHTML;
//           // Call the parent's callback function with the HTML content
//           if (onDescriptionChange) {
//             onDescriptionChange(htmlContent);
//           }
//         });
//       }
//     };
//     document.body.appendChild(script);

//     // Cleanup function
//     return () => {
//       if (link) document.head.removeChild(link);
//       if (script) document.body.removeChild(script);
//       if (quillInstance.current) {
//         // Remove event listener to prevent memory leaks
//         quillInstance.current.off("text-change");
//         quillInstance.current = null;
//       }
//     };
//   }, [onDescriptionChange, initialContent]); // Add onDescriptionChange and initialContent to dependency array

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         Description
//       </label>{" "}
//       {/* Added a label */}
//       <div
//         id="editor"
//         ref={editorRef}
//         className="my-1 border rounded-md min-h-[200px]"
//       >
//         {/* The initial content from props will be handled by Quill's setContents */}
//         {/* You can still put some default content here if initialContent is not always provided */}
//       </div>
//     </div>
//   );
// };

// export default AdminJobDescription;

import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill"; // <--- THIS IS CRUCIAL
import "react-quill/dist/quill.snow.css";
import imageResize from "quill-image-resize-module-react";
import { Button } from "../ui/button";

// Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageResize", imageResize);

const modules = {
  toolbar: [
    // You can customize the toolbar here
    [{ header: [1, 2, false] }],
    [{ color: ["red", "green"] }, { background: ["yellow", "cyan"] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: { matchVisual: false },
  // imageResize: {},
};

const AdminJobDescription = ({ onDescriptionChange }) => {
  const [content, setContent] = useState("");

  const isMounted = useRef(false);

  // useEffect(() => {
  //   // onDescriptionChange(content);
  //   setContent(initialContent);
  //   isMounted.current = true;
  // }, [initialContent]);

  return (
    <div>
      <h1> Job Description </h1>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        placeholder="start typing here"
      />
      <Button className="mt-5" onClick={() => onDescriptionChange(content)}>
        save
      </Button>
    </div>
  );
};

export default AdminJobDescription;
