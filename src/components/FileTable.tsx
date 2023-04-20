import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getStorage, ref, listAll, getDownloadURL, updateMetadata, getMetadata, deleteObject, StorageReference  } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {auth} from '../config/firebase'


const FileTable = () => {
  const storage = getStorage();
  const listRef = ref(storage, 'projectfiles');
  const [fileList, setFileList] = useState<{ name: string; author: string; downloadURL: string }[]>([]);
  const [itemRefs, setItemRefs] = useState<StorageReference[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        console.log('List All Response:', res);
        const promises = res.items.map((itemRef) => {
          return getMetadata(itemRef).then((metadata) => {
            console.log('metadata', metadata)
            if (metadata.customMetadata) {
              return { 
                name: metadata.customMetadata.title, 
                author: metadata.customMetadata.author, 
                downloadURL: metadata.customMetadata.downloadurl,
                uploadDate: metadata.timeCreated,
                fileType: metadata.contentType
              };
            }
            return null;
          });
        });
        Promise.all(promises)
        .then((fileList) => {
        console.log('Filelist', fileList)
        setFileList(fileList.filter((file): 
        file is { name: string; author: string; downloadURL: string; uploadDate: string; fileType: string; } => file !== null));
        setItemRefs(res.items);
        })
  .catch((error) => {
    console.error('Error retrieving metadata:', error);
  });
      })
      .catch((error) => {
        console.error('Error listing items:', error);
      });
  }, []);

  

  const handleDelete = async (fileToDelete: { name: string; author: string; downloadURL: string }) => {
    if (currentUserEmail !== fileToDelete.author) {
      alert("You do not have permission to delete this file.");
      return;
    }
    
    // Find the corresponding storage reference by matching the customMetadata
    let itemRefToDelete: StorageReference | null = null;
  
    for (const itemRef of itemRefs) {
      const metadata = await getMetadata(itemRef);
      if (metadata.customMetadata) {
        if (
          metadata.customMetadata.title === fileToDelete.name &&
          metadata.customMetadata.author === fileToDelete.author &&
          metadata.customMetadata.downloadurl === fileToDelete.downloadURL
        ) {
          itemRefToDelete = itemRef;
          break;
        }
      }
    }
  
    if (itemRefToDelete) {
      // Delete the file from Firebase Storage
      deleteObject(itemRefToDelete)
        .then(() => {
          console.log("File deleted successfully");
  
          // Remove the file from the fileList state
          setFileList((prevFileList) =>
            prevFileList.filter((file) => file !== fileToDelete)
          );
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    } else {
      console.error("File reference not found");
    }
  };


  //defines collums of datatable
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'uploadDate', headerName:'Upload Date', width:250},
    {field: 'fileType', headerName: 'File Type', width: 150},
    {
      field: 'downloadURL',
      headerName: 'Open',
      width: 75,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
         <i className="fa-sharp fa-regular fa-folder-open fa-2xl"></i>
        </a>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row)}><i className="fa-solid fa-trash fa-2xl"></i></button>
      ),
    },
  ];

  
  console.log("Rendered fileList:", fileList);

  return (
  <div className= 'flex justify-center'>
    <div className=  "container mx-10 my-5 flex flex-col"
    style = {{height: 400, width: '100%'}}>
      <DataGrid rows={fileList} columns={columns} getRowId={(row) => row.name + row.author} pageSizeOptions= {[10]} />
      </div>
  </div>
      
   
  );
};


export default FileTable;