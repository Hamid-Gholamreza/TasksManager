import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Note } from '../App';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotesIcon from '@mui/icons-material/Notes';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Tune } from '@mui/icons-material';

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          right: '0',
          left: 'auto',
          transformOrigin: 'top right',
          textAlign: 'right',
          width: '100%',
        },
        shrink: {
          transformOrigin: 'top right',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          direction: 'rtl',
        },
      },
    },
  },
});


interface NoteProps {
  note: Note;
}

const StickyNote: React.FC<NoteProps> = ({ note }) => {

  const [open, setOpen] = useState(note.isInitial);

  const [noteData, setNoteData] = useState({
    id: note.id,
    title: note.title,
    message: note.message,
    date: note.date,
    isInitial: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name , value} = e.target;
    setNoteData({...noteData, [name]: value});
};

  const [notesList, setNotesList] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem('notesList');
    return storedNotes ? JSON.parse(storedNotes).map((note: any) => ({
      ...note
    })) : [];
  });

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleEdit = () => {
    handleOpen();
    console.log('is open');
  }


  return (
    <Draggable>
      {open === true ? 
            <div className='w-[400px] h-fit bg-white cursor-move p-10 rounded-lg shadow-2xl'>
                <ThemeProvider theme={theme}>
                    <Box
                      component="form"
                      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                      noValidate
                      autoComplete="off"
                      className='flex flex-col justify-center items-center'
                    >
                      <TextField
                        id="standard-basic"
                        label="عنوان"
                        variant="standard"
                        dir="rtl"
                        className="float-right"
                        name='title'
                        value={noteData.title}
                        onChange={handleInputChange}
                      />
                      <TextField
                        id="standard-multiline-flexible"
                        label="یادداشت"
                        multiline
                        maxRows={4}
                        variant="standard"
                        name='message'
                        value={noteData.message}
                        onChange={handleInputChange}
                      />
                      <TextField
                        id="standard-basic"
                        label="عنوان"
                        variant="standard"
                        dir="rtl"
                        className="float-right"
                        name='date'
                        value={noteData.date}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <div className='w-full flex justify-center items-center gap-5 mt-3'>
                      <button className='w-[100px] flex justify-center items-center bg-blue-500 text-black text-xs p-1 rounded-2xl
                      hover:text-white hover:bg-blue-700' onClick={handleEdit}>
                          <EditIcon/>
                          <p>ویرایش</p>
                      </button>
                    </div>
                </ThemeProvider>
            </div>
          : <div onDoubleClick={handleOpen} className='w-[240px] h-[120px] bg-white rounded-2xl
          border-2 border-gray-300'>
              <div className='pr-3 pt-2'>
                <div className='flex flex-row-reverse gap-1 mt-1 text-sm'>
                  <NotificationsActiveIcon />
                  <p className='w-full text-right'>{noteData.title}</p>
                </div>
                <div className='flex flex-row-reverse gap-1 mt-2 text-sm'>
                    <NotesIcon />
                    <p>{noteData.message}</p>
                </div>
              </div>
            </div>
          }
    </Draggable>
  );
};


export default StickyNote;
