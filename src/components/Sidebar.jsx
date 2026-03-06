import {
  exportFullLayoutImage,
  exportFullLayoutPDF,
} from "../utils/exportLayout";

export default function Sidebar({ addBlock }) {
  return (
    <div className="sidebar">
      <h2>Builder</h2>

      <button onClick={() => addBlock("text")}>Add Text</button>
      <button onClick={() => addBlock("image")}>Add Image</button>
      <button onClick={() => addBlock("card")}>Add Card</button>

      <hr />
      <button onClick={exportFullLayoutImage}>
        Download Full Layout Image
      </button>

      <button onClick={exportFullLayoutPDF}>Download Full Layout PDF</button>
    </div>
  );
}
