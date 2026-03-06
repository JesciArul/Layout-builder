export default function BlockRenderer({ block }) {
  const flexStyle =
    block.layout === "row"
      ? { display: "flex", gap: "15px", alignItems: "center" }
      : {};

  switch (block.type) {
    case "text":
      return (
        <p style={{ color: block.textColor }}>{block.text || "Enter Text"}</p>
      );

    case "image":
      return (
        <div style={flexStyle}>
          {block.image ? (
            <img
              src={block.image}
              alt="uploaded"
              style={{ width: "200px", borderRadius: "6px" }}
            />
          ) : (
            <p>No image uploaded</p>
          )}

          <p>{block.text}</p>
        </div>
      );

    case "card":
      return (
        <div>
          <h3>{block.title || "Card Title"}</h3>

          <p>{block.description}</p>

          {block.files?.map((file, i) => {
            const url = URL.createObjectURL(file);

            return (
              <div key={i} className="file-card">
                <p>{file.name}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(url);
                  }}
                >
                  Open File
                </button>
              </div>
            );
          })}
        </div>
      );

    default:
      return null;
  }
}
