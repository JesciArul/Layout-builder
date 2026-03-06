export default function PropertyPanel({ selected, updateBlock }) {
  if (!selected) return <div className="panel">Select Block</div>;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      updateBlock(selected.id, "image", event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    updateBlock(selected.id, "files", files);
  };

  return (
    <div className="panel">
      <h3>Editor</h3>

      <label>Background</label>
      <input
        type="color"
        value={selected.background}
        onChange={(e) => updateBlock(selected.id, "background", e.target.value)}
      />

      <br />
      <br />

      <label>Text Color</label>
      <input
        type="color"
        value={selected.textColor}
        onChange={(e) => updateBlock(selected.id, "textColor", e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Text"
        value={selected.text}
        onChange={(e) => updateBlock(selected.id, "text", e.target.value)}
      />

      <br />
      <br />

      {selected.type === "image" && (
        <>
          <select
            value={selected.layout}
            onChange={(e) => updateBlock(selected.id, "layout", e.target.value)}
          >
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>

          <br />
          <br />

          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </>
      )}

      {selected.type === "card" && (
        <>
          <input
            placeholder="Title"
            value={selected.title}
            onChange={(e) => updateBlock(selected.id, "title", e.target.value)}
          />

          <br />
          <br />

          <textarea
            placeholder="Description"
            value={selected.description}
            onChange={(e) =>
              updateBlock(selected.id, "description", e.target.value)
            }
          />

          <br />
          <br />

          <input type="file" multiple onChange={handleFileUpload} />
        </>
      )}
    </div>
  );
}
