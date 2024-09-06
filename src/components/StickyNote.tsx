import React, { CSSProperties } from 'react';
import Draggable from 'react-draggable';

const StickyNote: React.FC = () => {
  return (
    <Draggable>
      <div className='w-[400px] h-[180px] bg-white cursor-move p-10 rounded-lg shadow-2xl'>
        <h1>title</h1>
        <textarea  placeholder="یادداشت خود را اینجا بنویسید..."
        className='w-full h-full border-none outline-none resize-none bg-transparent' dir='rtl'>
        </textarea>
      </div>
    </Draggable>
  );
};


export default StickyNote;
