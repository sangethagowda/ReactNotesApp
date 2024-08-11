import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { title } from 'process';
import { mockNoteData } from './Constants/constant';
import { Note } from './interface/projectInterface';

function App() {
  const [notes,setNotes] =useState<Note[]>(mockNoteData);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [selectedNote,setSelectedNote]=useState<Note | null>(null);

 const handleNoteClick=(note:Note)=>{
  setTitle(note.title);
  setContent(note.content);
  setSelectedNote(note);
 }
  
  const handleAddNote=(event:React.FormEvent)=>{
    event.preventDefault();
    const newNote:Note={
      id: notes.length,
      title: title,
      content: content
    };
    setNotes([newNote,...notes]);
    setTitle('');
    setContent('');
  }

  const handleUpdateNote=(event:React.FormEvent)=>{
    event.preventDefault();
    if(!selectedNote)
      return;
    const updatedNote :Note={
      id: selectedNote.id,
      title: title,
      content: content,
    }

    const updatedNoteslist = notes.map((note)=>{
     return note.id=== updatedNote.id ? updatedNote : note;
    })
   
    setNotes(updatedNoteslist)
    setTitle('');
    setContent('');
    setSelectedNote(null);
  }

  const handleCancel = ()=>{
    setTitle('');
    setContent('');
    setSelectedNote(null);
  }

  const deletebutton =(event:React.FormEvent,noteId:number)=>{
    event.stopPropagation();
    const updateNotes = notes.filter((note)=>note.id !==noteId)
    setNotes(updateNotes);
  }

  return (
    <div className="app-container">
        <form className='note-form' onSubmit={(event)=>selectedNote? handleUpdateNote(event) : handleAddNote(event)}>
          <input placeholder='title'
            value={title}
            onChange={(event)=>{
              setTitle(event.target.value)
            }}
           required></input>
          <textarea 
          placeholder='content' 
          value={content}
          onChange={(event)=>{
            setContent(event.target.value)
          }}
          required rows={10}></textarea>
        
          {
            selectedNote ? (<div className='edit-buttons'>
              <button type='submit'>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>) :(<button type='submit'>Add Note</button>)
          }
        </form>
        
        <div className='notes-grid'>
        {
          notes.map((note:Note)=>{
            return(
            <div className='notes-item' onClick={()=>{handleNoteClick(note)}}>
              <div className='notes-header'>
                <button onClick={(event)=>{deletebutton(event,note.id)}}>
                  X
                </button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>)
          })
        }
        </div>
    </div>
  );
}

export default App;
