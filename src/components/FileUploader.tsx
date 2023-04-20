
import {storage} from '../config/firebase'
import {ref, uploadBytes, getStorage, getDownloadURL,  listAll,  updateMetadata, getMetadata} from 'firebase/storage'
import {useState, useEffect} from 'react'
import {
    auth,
    googleProvider,
        } from '../config/firebase'

interface Metadata {
    customMetadata: {
      author: string;
      title: string
    };
  }

  
  
const FileUploader = () => {
    const [fileUpload, setFileUpload] = useState<Blob | null>(null);
    const [filetitle, setFileTitle] = useState('')

    const metadata: Metadata = {
        customMetadata: {
            author: auth?.currentUser?.displayName ?? 'unknown',
            title: filetitle
        }
    }

      const uploadFile= async() =>{
  
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
        try{
        await uploadBytes(filesFolderRef, fileUpload, metadata )
        } catch(err){console.error(err)};

       getDownloadURL(ref(storage, `projectfiles/${fileUpload.name}`)) 
       .then((url)=>{
       const newMetadata={
        customMetadata:{
        'downloadurl': url
        }
      }
      updateMetadata(ref(storage, `projectfiles/${fileUpload.name}`), newMetadata)
      }
      )
      location.reload()
    }

  return (
    <div>
      <div>
      <button onClick= {()=>window.location.reload()}> Refresh</button>
        <input type= 'text' placeholder= 'Title' name='title' onChange = {(e)=>setFileTitle(e.target.value)}/>
        <input type="file" onChange = {(e)=>
        { if (e.target.files!= null) setFileUpload(e.target.files[0]) }}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  )
}




  
export default FileUploader