import React, { useEffect, useState } from 'react';
import './App.css';
import { Note } from './interface/projectInterface';

function App() {
  const [notes,setNotes] =useState<Note[]>([]);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [selectedNote,setSelectedNote]=useState<Note | null>(null);

  useEffect(()=>{
      const fetchNotes = async()=>{
        try {
        let response = await fetch('http://localhost:5000/api/notes')
        const notes:Note[]=await response.json();
        setNotes(notes)
        } catch (error) {
          console.log(error)
        }  
      }
    fetchNotes();
  },[])

 const handleNoteClick=(note:Note)=>{
  setTitle(note.title);
  setContent(note.content);
  setSelectedNote(note);
 }
  
  const handleAddNote=async(event:React.FormEvent)=>{
    event.preventDefault();
      try {
      const response = await fetch('http://localhost:5000/api/notes',{
        method:'POST',
        body:JSON.stringify({title,content,id:notes.length+1}),
        headers:{
          "Content-Type":'application/json'
        }
      })      
      const newNote = await response.json()
      setNotes([newNote,...notes]);
      setTitle('');
      setContent('');
      } catch (error) {
        console.log(error)
      }  
  }

  const handleUpdateNote=async(event:React.FormEvent)=>{
    event.preventDefault();
    if(!selectedNote)
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`,{
        method:'PUT',
        body:JSON.stringify({title,content,id:selectedNote.id}),
        headers:{
          "Content-Type":'application/json'
        }
      }) 
      const updatedNote:Note =await response.json();
      const updatedNoteslist = notes.map((note)=>{
        return note.id=== updatedNote.id ? updatedNote : note;
       })
      
       setNotes(updatedNoteslist)
       setTitle('');
       setContent('');
       setSelectedNote(null);
    } catch (error) {
     console.log(error) 
    }

   
  }

  const handleCancel = ()=>{
    setTitle('');
    setContent('');
    setSelectedNote(null);
  }

  const deletebutton =async(event:React.FormEvent,noteId:number)=>{
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`,{
        method:'DELETE',
        body:JSON.stringify({id:noteId}),
        headers:{
          "Content-Type":'application/json'
        }
      }) 
      if(response.ok){
        const updateNotes = notes.filter((note)=>note.id !==noteId);
        setNotes(updateNotes);
      }      
   
    } catch (error) {
     console.log(error) 
    }
   
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
