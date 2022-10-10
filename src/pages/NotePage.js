import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

  let noteId = useParams().id;
  let navigate = useNavigate()
  let [note, setNote] = useState(null)

  
  useEffect(() => {
    let getNote = async () => {
      if (noteId === 'new') return

      let response = await fetch(`https://kayanis.pythonanywhere.com/api/notes/${noteId}/`)
      let data = await response.json()
      setNote(data)
    }
    getNote()
  }, [noteId])

  let createNote = async () => {
    fetch(`https://kayanis.pythonanywhere.com/api/notes/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": '{{csrf_token}}'
        },
        body: JSON.stringify(note)
    })
  }


  let updateNote = async () => {
    fetch(`https://kayanis.pythonanywhere.com/api/notes/${noteId}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    fetch(`https://kayanis.pythonanywhere.com/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/')
  }

  let handleSubmit = () => {
    if (noteId !== 'new' && note.body === ''){
      deleteNote()
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note !== null) {
      createNote()
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
            <ArrowLeft onClick={handleSubmit}/>
          </h3>
          {noteId !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ) : (
              <button onClick={handleSubmit}>Save</button>
            )}
          
      </div>
      <textarea onChange={(e) => {setNote({ ...note, "body":e.target.value })}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
