import React, {useState} from 'react';
import './App.css';
import StickyNote from './components/StickyNote';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import dayjs, { Dayjs } from 'dayjs';


export interface Note {
  id: number,
  title: string,
  message: string,
  date: Dayjs,
  isInitial: boolean,
  timeSaved: string
}


function App() {

  const storedNotes = localStorage.getItem('notesList');
  const parsedNotes = storedNotes ? Array.from(JSON.parse(storedNotes)) : [];
  const [notesList, setNotesList] = useState(parsedNotes);



  const initialNote: Note = {
    id: parsedNotes.length + 1,
    title: '',
    message: '',
    date: dayjs(),
    isInitial: true,
    timeSaved: new Date().toLocaleString()
  }

  const handleDelete = (id: number) => {
    let list = localStorage.getItem('notesList');
    const arrList = list?.length ? Array.from(JSON.parse(list)) : [];
    let index = arrList.findIndex((item: any) => item.id === id);   
    arrList.splice(index, 1);
    setNotesList(arrList);
    localStorage.setItem('notesList', JSON.stringify(arrList));
  }


  const handleAddNote = () => {
      let list = localStorage.getItem('notesList');
      const arrList = list?.length ? Array.from(JSON.parse(list)) : [];
      const updatedNotesList = arrList.concat(initialNote);
      localStorage.setItem('notesList', JSON.stringify(updatedNotesList));
      setNotesList(updatedNotesList);

  }


  return (
    <div className='w-full h-[100vh] relative'>
      <div className='w-full h-[200px] bg-blue-600 flex flex-col justify-center items-center gap-8'>
        <h1 className='text-xl text-center'>برای اضافه کردن یادداشت جدید کلیک کنید</h1>
        <button className='w-12 h-12 bg-green-500 rounded-lg text-2xl text-white hover:bg-green-800' onClick={handleAddNote}>+</button>
      </div>
      {/* Notes Container */}
      <div className='h-[100vh]'>
          {
            notesList.map((item: any, index) => (
                <Draggable key={item.id}>
                  <div className='w-[250px] h-fit relative'>
                      <StickyNote note={item} />
                      <button className='absolute top-[-3px] left-0 bg-red-600 rounded-full text-white p-1 text-xs'
                      onClick={() => handleDelete(item.id)}>
                          <CloseIcon />
                      </button>
                  </div>
                </Draggable>
          ))}
      </div>
    </div>
  );
}

export default App;