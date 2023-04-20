
import {storage} from '../config/firebase'
import {ref, uploadBytes, getDownloadURL,  updateMetadata,} from 'firebase/storage'
import {useState,} from 'react'
import {auth, googleProvider,} from '../config/firebase'

interface Metadata {
  customMetadata: {
    author_uid?: string;
    author: string;
    title: string;
  };
}

  
  
const FileUploader = () => {
    const [fileUpload, setFileUpload] = useState<Blob | null>(null);
    const [filetitle, setFileTitle] = useState('')

    const metadata: Metadata = {
      customMetadata: {
        author: auth?.currentUser?.displayName ?? 'unknown',
        author_uid: auth?.currentUser?.uid,
        title: filetitle,
      },
    };

      const uploadFile= async() =>{
  
        if (!fileUpload) return;
        if (filetitle.trim()===''){
          alert('Title field must not be blank.');
          return;
        }
        const userId= auth?.currentUser?.uid;
        const filesFolderRef = ref(storage, `projectfiles/${userId}/${fileUpload.name}`);
        try{
        await uploadBytes(filesFolderRef, fileUpload, metadata )
        } catch(err){console.error(err)};

       getDownloadURL(ref(storage, `projectfiles/${userId}/${fileUpload.name}`)) 
       .then((url)=>{
      console.log("Download Url", url)
       const newMetadata={
        customMetadata:{
        'downloadurl': url
        }
      }
      updateMetadata(ref(storage, `projectfiles/${userId}/${fileUpload.name}`), newMetadata)
      }
      )
      //location.reload()
    }

  return (
    <div>
      <div className='flex flex-row justify-evenly p-6'>
      <button onClick= {()=>window.location.reload()}> <i className="fa-solid fa-arrows-rotate fa-2xl"></i></button>
        <input className='border rounded' type= 'text' placeholder= 'Title' name='title' onChange = {(e)=>setFileTitle(e.target.value)}/>
        <input className='' type="file" onChange = {(e)=>
          { if (e.target.files!= null) setFileUpload(e.target.files[0]) }}/>
        <button className='' onClick={uploadFile}><i className="fa-solid fa-cloud-arrow-up fa-2xl"></i></button>
      </div>
    </div>
  )
}




  
export default FileUploader