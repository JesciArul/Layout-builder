import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BlockRenderer from "./BlockRenderer";

export default function SortableBlock({
  block,
  setSelected,
  deleteBlock,
  duplicateBlock,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="block">
      <div className="drag" {...attributes} {...listeners}>
        ☰ Drag
      </div>

      <div
        className="block-content"
        style={{ background: block.background }}
        onClick={() => setSelected({ ...block })}
      >
        <BlockRenderer block={block} />
      </div>

      <div className="actions">
        <button onClick={() => duplicateBlock(block)}>Duplicate</button>

        <button onClick={() => deleteBlock(block.id)}>Delete</button>
      </div>
    </div>
  );
}
