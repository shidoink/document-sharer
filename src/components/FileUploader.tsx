
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
        author_uid: auth?.currentUser?.uid,
        author: auth?.currentUser?.email ?? 'unknown',
        title: filetitle,
      },
    };

    const uploadFile = async () => {
      if (!fileUpload) return;
      if (filetitle.trim() === "") {
        alert("Title field must not be blank.");
        return;
      }
      const userId = auth?.currentUser?.uid;
      const filesFolderRef = ref(storage, `projectfiles/${userId}/${fileUpload.name}`);
      try {
        await uploadBytes(filesFolderRef, fileUpload, metadata);
      } catch (err) {
        console.error(err);
      }
    
      getDownloadURL(ref(storage, `projectfiles/${userId}/${fileUpload.name}`)).then((url) => {
        console.log("Download Url", url);
        const newMetadata = {
          customMetadata: {
            downloadurl: url,
          },
        };
        updateMetadata(ref(storage, `projectfiles/${userId}/${fileUpload.name}`), newMetadata);
        // Refresh the file list
        window.location.reload();
      });
    };

    return (
      <div className="bg-gray-800 text-white p-4 ">
        <div className="flex flex-row justify-evenly items-center p-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 p-2 rounded-md hover:bg-gray-700"
          >
            <i className="fa-solid fa-arrows-rotate fa-2xl"></i>
          </button>
          <input
            className="border bg-gray-900 text-white border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) => setFileTitle(e.target.value)}
          />
          <input
            className="bg-gray-900 p-2 rounded-md text-white cursor-pointer"
            type="file"
            onChange={(e) => {
              if (e.target.files != null) setFileUpload(e.target.files[0]);
            }}
          />
          <button
            className="bg-gray-900 p-2 rounded-md hover:bg-gray-700"
            onClick={uploadFile}
          >
            <i className="fa-solid fa-cloud-arrow-up fa-2xl"></i>
          </button>
        </div>
        <div className='flex justify-center'>Click on file to update title</div>
        
      </div>
    );
}




  
export default FileUploader