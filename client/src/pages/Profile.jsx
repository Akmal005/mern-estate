import { useSelector } from "react-redux"
import { useRef } from "react"
import { useState, useEffect } from "react"
import { app } from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'


export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePercentage);
  

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }

  },[file])
 
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / 
      snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress))
      console.log(filePercentage)
    },
    (error) =>{
      setFileUploadError(true)
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) =>
          setFormData({...formData, avatar: downloadURL})
        );
      }  
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"></input>
        
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" 
        className="rounded-full h-24 w-24 
        object-cover 
        cursor-pointer
        self-center mt-2"
         ></img>
        <p className="text-sm self-center">{fileUploadError ? 
           ( <span className="text-red-700">Error Image Upload (Image must be less than 2 mbs)</span> )
            : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700"> {`Upload ${filePercentage}%`} 
            </span>)
            : filePercentage === 100 ? (
            <span>Successfully Uploaded</span>)
            : 
            " "
         }
        </p>
        
         <input 
         type='text'
         placeholder="Username"
         className="border p-3 rounded-lg"
         id="username"></input>
         
         
          <input 
         type='text'
         placeholder="email"
         className="border p-3 rounded-lg"
         id="email"></input>
          
          
          <input 
         type='text'
         placeholder="password"
         className="border p-3 rounded-lg"
         id="password"></input>
        
        
         <button className="bg-slate-700
          text-white rounded-lg 
          p-3 uppercase hover:opacity-95 
          disabled:opacity-80">Update</button>

         
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  )
}
