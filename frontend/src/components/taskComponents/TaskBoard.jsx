import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './SortableTask';
import { CSS } from '@dnd-kit/utilities';

const TaskBoard = ({stages}) => {
    
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Task 1', description: 'Description of Task 1', status: 'To Do' },
    { id: '2', name: 'Task 2', description: 'Description of Task 2', status: 'In Progress' },
    { id: '3', name: 'Task 3', description: 'Description of Task 3', status: 'Done' },
  ]);

  const [activeId, setActiveId] = useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const SortableTaskWrapper = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: task.id,
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      transition: isDragging ? 'transform 0.2s ease' : undefined,
      zIndex: isDragging ? 9999 : 'auto',
    };

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} className="task-card" style={style}>
        <SortableTask
          id={task.id}
          name={task.name}
          description={task.description}
          status={task.status}
        />
      </div>
    );
  };

  const getColumnItems = (status) => tasks.filter(task => task.status === status);

  const DroppableColumn = ({ status }) => {
    const { isOver, setNodeRef } = useDroppable({
      id: status,
    });

    return (
      <div
        ref={setNodeRef}
        className={`task-column ${status.toLowerCase().replace(' ', '-')}`} // Add a dynamic class based on the status
      >
        <h2>{status}</h2>
        {getColumnItems(status).map(task => (
          <SortableTaskWrapper key={task.id} task={task} />
        ))}
      </div>
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const updatedTasks = tasks.map(task => {
        if (task.id === active.id) {
          return { ...task, status: over.id };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
    setActiveId(null);
  };

  const activeTask = tasks.find(task => task.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-3 text-center">
        <h3 className="text-xl">Drag and Drop Tasks</h3>

        <div className="flex justify-between mt-4">
          <SortableContext items={getColumnItems('To Do')} strategy={verticalListSortingStrategy}>
            <DroppableColumn status="To Do" />
          </SortableContext>

          <SortableContext items={getColumnItems('In Progress')} strategy={verticalListSortingStrategy}>
            <DroppableColumn status="In Progress" />
          </SortableContext>

          <SortableContext items={getColumnItems('Done')} strategy={verticalListSortingStrategy}>
            <DroppableColumn status="Done" />
          </SortableContext>
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <SortableTask
            id={activeTask.id}
            name={activeTask.name}
            description={activeTask.description}
            status={activeTask.status}
            overlay={true} // Set overlay prop to true for DragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
