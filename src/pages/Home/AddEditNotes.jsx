import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({noteData, type, getAllNotes, onClose}) => {
  const [title, setTitle] =useState(noteData.title || "")
  const [content, setContent] = useState(noteData.content || "")
  const [tags, setTags] = useState(noteData.tags || [])
  const [error, setError] = useState(null)

  // Add note
  const addNewNote = async()=>{
    try {
      const response = await axiosInstance.post('/6720819ecff17f47e0096fed/add-note', {
        title,
        content,
        tags
      })

      if(response.data && response.data.note){
        getAllNotes()
        onClose()
      }

    } catch (error) {
      if(error.response && 
        error.response.data && 
        error.response.data.message)
        {
         setError(error.response.data.message)
        }
    }
  }


  // Edit note
  // const editNote = async() =>{
  //   // const noteId = req.param.notes._id
  //   try {
  //     const response = await axiosInstance.put(`/6720819ecff17f47e0096fed/edit-note/672462aba904413d60780750`{
  //       title,
  //       content,
  //       tags
  //     })
  //     if(response.data && response.data.note){
  //       getAllNotes()
  //       onClose()
  //     }


  //   } catch (error) {
  //     if (error.response && error.response.data && error.response.data.message) {
  //       setError(error.response.data.message);
  //     }
  //   }
  // }

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/672472b2a904413d6078077e`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };


  const handleAddNote = () =>{
    if(!title){
      setError('Please Enter the title')
      return
    }

    if(!content){
      setError('Please Enter the content')
      return
    }

    setError()

    if(type === "edit"){
      editNote()
    }else{
      addNewNote()
    }
  }

  return (
    <div className='relative'>
      <button 
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' 
        onClick={onClose}  
      >
          <MdClose className='text-xl text-slate-400' />
      </button>


      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input 
          type='text'
          className='text-2xl text-slate-950 outline-none'
          placeholder='Go to gym'
          value={title}
          onChange={({target})=>setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea 
          type="text"
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({target})=>setContent(target.value)}
        />
      </div>

      <div className='mt-3'>
        <lable className="input-label" >Tags</lable>
        
        <TagInput
          tags={tags}
          setTags={setTags}
        />
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        {type === 'edit' ? "UPDATE" : "ADD"}
      </button>
    </div>
  )
}

export default AddEditNotes 
