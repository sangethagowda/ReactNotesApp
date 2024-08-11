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
  const handleSubmit=(event:React.FormEvent)=>{
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
  return (
    <div className="app-container">
        <form className='note-form' onSubmit={(event)=>handleSubmit(event)}>
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
          <button type='submit'>Add Note</button>
        </form>
        
        <div className='notes-grid'>
        {
          notes.map((note:Note)=>{
            return(<div className='notes-item'>
              <div className='notes-header'>
                <button>
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
