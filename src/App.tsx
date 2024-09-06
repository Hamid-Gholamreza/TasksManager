import React, {useState, useEffect} from 'react';
import './App.css';
import StickyNote from './components/StickyNote';

interface Note {
  title: string,
  message: string,
  date: Date
}


function App() {

  const [notesList, setNotesList] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem('notesList');
    return storedNotes ? JSON.parse(storedNotes).map((note: any) => ({
      ...note,
      date: new Date(note.date)
    })) : [];
  });

  const handleAddNote = () => {

    

  }

  useEffect(() => {
    localStorage.setItem('notesList', JSON.stringify(notesList));
  }, [notesList]);


  return (
    <div className='w-full h-[100vh] relative'>

      <div className='w-full h-[200px] bg-blue-600 flex flex-col justify-center items-center gap-8'>
        <h1 className='text-xl text-center'>برای اضافه کردن یادداشت جدید کلیک کنید</h1>
        <button className='w-12 h-12 bg-green-500 rounded-lg text-2xl text-white' onClick={handleAddNote}>+</button>
      </div>

      {/* Notes Container */}
      <div>

      </div>
    </div>
  );
}

export default App;
