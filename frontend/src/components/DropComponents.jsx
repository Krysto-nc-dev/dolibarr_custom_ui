import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

const DropComponents = () => {
  const [languages, setLanguages] = useState([
    {
      id: '1',
      name: 'JavaScript',
      description: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.',
    },
    {
      id: '2',
      name: 'Python',
      description: 'Python is an interpreted, high-level and general-purpose programming language.',
    },
    {
      id: '3',
      name: 'Java',
      description: 'Java is a class-based, object-oriented programming language.',
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.findIndex((lang) => lang.id === active.id);
        const overIndex = items.findIndex((lang) => lang.id === over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-3 text-center">
        <h3 className="text-xl">The Best Programming Languages !!</h3>

        <SortableContext items={languages} strategy={verticalListSortingStrategy}>
          {languages.map((language) => (
            <SortableItem key={language.id} id={language.id} name={language.name} description={language.description} image={language.image}/>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default DropComponents;
