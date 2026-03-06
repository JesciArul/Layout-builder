import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertyPanel from "./components/PropertyPanel";

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selected, setSelected] = useState(null);

  // Load saved layout
  useEffect(() => {
    const saved = localStorage.getItem("layout");
    if (saved) setBlocks(JSON.parse(saved));
  }, []);

  // Save layout automatically
  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(blocks));
  }, [blocks]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      text: "",
      image: "",
      title: "",
      description: "",
      files: [],
      layout: "column",
      background: "#ffffff",
      textColor: "#000000",
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    setSelected(null);
  };

  const duplicateBlock = (block) => {
    const copy = { ...block, id: Date.now() };
    setBlocks((prev) => [...prev, copy]);
  };

  const updateBlock = (id, key, value) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)),
    );

    setSelected((prev) => (prev?.id === id ? { ...prev, [key]: value } : prev));
  };

  const downloadLayout = () => {
    const data = JSON.stringify(blocks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "layout.json";
    a.click();
  };

  return (
    <div className="builder">
      <Sidebar addBlock={addBlock} downloadLayout={downloadLayout} />

      <Canvas
        blocks={blocks}
        setBlocks={setBlocks}
        setSelected={setSelected}
        deleteBlock={deleteBlock}
        duplicateBlock={duplicateBlock}
      />

      <PropertyPanel selected={selected} updateBlock={updateBlock} />
    </div>
  );
}
