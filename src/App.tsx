import React, {useState, useEffect} from 'react';
import './App.css';
import StickyNote from './components/StickyNote';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';


export interface Note {
  id: number,
  title: string,
  message: string,
  date: string,
  isInitial: boolean
}


function App() {

  const [newNote, setNewNote] = useState(false);
  const storedNotes = localStorage.getItem('notesList');
  const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const listLength = parsedNotes.length;
  const [notesList, setNotesList] = useState<Note[]>(parsedNotes);
  const [count, setCount] = useState(parsedNotes.length);





  const initialNote: Note = {
    id: count,
    title: '',
    message: '',
    date: '',
    isInitial: true
  }

  const handleDelete = (id: number) => {
    setNotesList((prevNotes) => prevNotes.filter(note => note.id !== id ))
  }

  const Notes = notesList.map((item: Note, index) => {
    return (
        <Draggable>
            <div className='w-[250px] h-fit relative'>
                <StickyNote key={index} note={item} />
                <button className='absolute top-[-3px] left-0 bg-red-600 rounded-full text-white p-1 text-xs'
                onClick={() => handleDelete(item.id)}><CloseIcon/></button>
            </div>
        </Draggable>
    )
  })


  const handleAddNote = () => {
      setNewNote(true);
      setCount(count + 1);
      // let list = localStorage.getItem('notesList');
      // console.log(list);
      setNotesList((prevNotes) => [...prevNotes, initialNote]);
      // setNotesList([...(Array.from(localStorage.getItem('notesList'))), initialNote])
      localStorage.setItem('notesList', JSON.stringify(notesList));
      setNewNote(false);
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
      <div className='h-[100vh]'>
        {
          newNote ? 
          <Draggable>
              <div className='relative'>
                <StickyNote note={initialNote} />
                <button className='absolute bg-red-600 rounded-full text-white p-1'
                  onClick={() => handleDelete(initialNote.id)}><CloseIcon /></button>
              </div>
          </Draggable> : ''
        }
          {Notes}
      </div>
    </div>
  );
}

export default App;
