// import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import NoteCard from '../../components/Cards/NoteCard'
// import { MdAdd } from 'react-icons/md'
// import AddEditNotes from './AddEditNotes'
// import Modal from'react-modal'
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../../utils/axiosInstance'


// function Home() {
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown :false,
//     type: "add",
//     data: null,
//   });
//   const [allNotes, setAllNotes] = useState([]);

//   const [userInfo, setUserInfo] = useState(null);

//   const navigate = useNavigate()


//   // Get all notes
//   const getAllNotes = async() =>{
//     try {
//       const response = await axiosInstance.get("/671b1992d5f182c7d8d2aa9d/get-all-notes");
//       if(response.data && response.data.notes){
//         setAllNotes(response.data.notes)
//       }
//     } catch (error) {
//       console.log("An unexpected error is occurred. Please try again")
//     }
//   }

//   // Get user info
//   const getUserInfo = async()=>{
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if(response.data && response.data.user){
//         setUserInfo(response.data.user)
//       }
      
//     } catch (error) {
//       if(error.response === 401){
//         localStorage.clear();
//         navigate("/login")
//       }
//     }
//   }


//   useEffect(() =>{
//     getAllNotes()
//     getUserInfo()
//     return () =>{}
//   },[])


//   return (
//     <>
//       <Navbar userInfo={userInfo}/>
//       <div className='container mx-auto'>
//         <div className='grid grid-cols-3 gap-4 mt-8'>
//           {allNotes.map((item, index) =>(
//             <NoteCard 
//             key={item._id}
//             title={item.title} 
//             date={item.createdOn} 
//             content={item.content} 
//             tags={item.tags}
//             isPinned={item.isPinned}
//             onEdit={() =>{}}
//             onDelete={() =>{}}
//             onPinNote ={() =>{}}
//           />
//           ))}
          
          
//         </div>
//       </div>
//       <button 
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
//         onClick={() =>{
//           setOpenAddEditModal({isShown:true, type:"add", data:null})
//         }}>
//         <MdAdd className='text-[32px] text-white'/>
//       </button>
//       <Modal
//         isOpen = {openAddEditModal.isShown}
//         onRequestClose={()=>{}}
//         style={{
//           overlay:{
//             backgroundColor:'rgba(0,0,0,0.2)',
//           }
//         }}
//         contentLabel=""
//         className=" w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//       >

//       <AddEditNotes
//         type={openAddEditModal.type}
//         noteData={openAddEditModal.data}
//         onClose={()=>{
//           setOpenAddEditModal({isShown:false, type:'add', data:null})
//         }}
//         getAllNotes={getAllNotes}
//       /> 
//       </Modal>

//     </>
//   )
// }

// export default Home






import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Edit note
  const handleEdit = (noteDetails) =>{
    setOpenAddEditModal({ isShown:true, data:noteDetails, type:'edit'})
  }


  // Fetch user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };


    // Fetch all notes
    const getAllNotes = async () => {
      // const userId = localStorage.getItem('user');
      // if (!userId) {
      //   console.log("User ID not found",error);
      //   return;
      // }
      try {
        const response = await axiosInstance.get(`/6720819ecff17f47e0096fed/get-all-notes`)

        if (response.data && response.data.notes) {
          setAllNotes(response.data.notes);
        }
      } catch (error) {
        console.log(error)
        console.error("An unexpected error occurred while fetching notes.");
      }
    };
  

  // Run once on component mount to get initial data
  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  // Handle modal close
  const closeModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item, index) => (
            <NoteCard 
              key={item._id}
              title={item.title} 
              date={item.createdOn} 
              content={item.content} 
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() =>handleEdit(item)}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>
      
      {/* Add Note Button */}
      <button 
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      {/* Modal for Add/Edit Note */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.2)' }
        }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>{
            setOpenAddEditModal({isShown:false, type:'add', data:null});
          }}
          getAllNotes={getAllNotes}
        /> 
      </Modal>
    </>
  );
}

// 2.08

export default Home;
