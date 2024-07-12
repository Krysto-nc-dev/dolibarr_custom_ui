import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTask = ({ id, name, description, status, overlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`task-card ${overlay ? 'overlay' : ''}`}>
      <div className="p-3 bg-gray-700 shadow-md rounded-md">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default SortableTask;
