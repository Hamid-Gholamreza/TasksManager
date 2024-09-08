import React, { useState, useEffect } from 'react';
import { Note } from '../App';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotesIcon from '@mui/icons-material/Notes';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


    const theme = createTheme({
        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        right: 0,
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

    const [open, setOpen] = useState(note.isInitial ? note.isInitial : false);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs(note.date));

    const handleTimeChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
    //@ts-ignore
    setNoteData({ ...noteData, date: newValue ? newValue.toISOString() : '' });
    };
    const [ring, setRing] = useState(false);

    const [noteData, setNoteData] = useState<Note>(() => {
    return {
        id: note.id,
        title: note.title,
        message: note.message,
        date: note.date,
        isInitial: false,
        timeSaved: note.timeSaved,
        };
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNoteData({ ...noteData, [name]: value });
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        const list = localStorage.getItem('notesList');
        const arrList = list?.length ? Array.from(JSON.parse(list)) : [];
        let idTofind = arrList.find((item: any) => item.id === noteData.id);
        const index = arrList.indexOf(idTofind);
        arrList[index] = { ...noteData, date: selectedTime ? selectedTime.toISOString() : '' };
        localStorage.setItem('notesList', JSON.stringify(arrList));
        setOpen(!open);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            if (now.isSame(selectedTime, 'minute')) {
                setRing(now.isSame(selectedTime, 'minute'));
                console.log(selectedTime);
                
            } else {
                setRing(now.isSame(selectedTime, 'minute'));
                console.log(selectedTime);
                }
        }, 1000);
        
        return () => {
            clearInterval(interval);
            setRing(false);
        }
        }, [selectedTime]);

    return (
        <div>
            {open === true ? (
                <div className={`w-[400px] h-full ${ring && !note.isInitial ? 'bg-red-500' : 'bg-white'} cursor-move py-10 rounded-2xl shadow-2xl`}>
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
                            name="title"
                            value={noteData.title}
                            onChange={handleInputChange}
                            />
                            <TextField
                            id="standard-multiline-flexible"
                            label="یادداشت"
                            multiline
                            maxRows={4}
                            variant="standard"
                            name="message"
                            value={noteData.message}
                            onChange={handleInputChange}
                            />
                            <div className=''>
                            <p className='text-right'>
                                <AccessAlarmIcon />
                            </p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                    label=""
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            </div>
                            <div className='w-full'>
                                <p className='text-xs text-right'>{note.timeSaved} ثبت شده در</p>
                            </div>
                        </Box>
                        <div className='w-full flex justify-center items-center gap-5 mt-3'>
                            <button className='w-[100px] flex justify-center items-center bg-blue-500 text-black text-xs px-1 py-2 rounded-2xl hover:text-white hover:bg-blue-700' onClick={handleSave}>
                            <p>ذخیره و بستن</p>
                            </button>
                        </div>
                    </ThemeProvider>
                </div>
            ) : (
                <div onDoubleClick={handleOpen} className={`w-fit h-fit ${ring ? 'bg-red-500' : 'bg-white'} rounded-2xl border-2 ${ring ? 'border-red-500' : 'border-green-500'}`}>
                    <div className='p-2'>
                        <div className='flex flex-row-reverse gap-1 mt-3 text-sm'>
                            <TaskAltIcon />
                            <p className='w-full text-right'>{noteData.title}</p>
                        </div>
                        <div className='flex flex-row-reverse gap-1 my-2 text-sm'>
                            <NotesIcon />
                            <p className='text-right'>{noteData.message}</p>
                        </div>
                        <div className='my-2 flex flex-row-reverse justify-center items-center gap-4'>
                            <p className='text-right'>:اعلان</p>
                            <p>{selectedTime?.toDate().toLocaleString()}</p>

                        </div>
                        <div className='mr-1'>
                            <p className='text-xs text-right'>{note.timeSaved} ثبت شده در</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StickyNote;