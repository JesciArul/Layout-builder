import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableBlock from "./SortableBlock";

export default function Canvas({
  blocks,
  setBlocks,
  setSelected,
  deleteBlock,
  duplicateBlock,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);

      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div className="canvas">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              setSelected={setSelected}
              deleteBlock={deleteBlock}
              duplicateBlock={duplicateBlock}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
