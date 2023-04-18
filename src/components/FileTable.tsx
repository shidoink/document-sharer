import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getStorage, ref, listAll, getDownloadURL, updateMetadata, getMetadata } from "firebase/storage";


const FileTable = () => {
  const storage = getStorage();
  const listRef = ref(storage, 'projectfiles');
  const [fileList, setFileList] = useState<{ name: string; author: string; downloadURL: string }[]>([]);

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
              };
            }
            return null;
          });
        });
        Promise.all(promises)
          .then((fileList) => {
            console.log('Filelist', fileList)
            setFileList(fileList.filter((file): 
            file is { name: string; author: string; downloadURL: string } => file !== null));
          })
          .catch((error) => {
            console.error('Error retrieving metadata:', error);
          });
      })
      .catch((error) => {
        console.error('Error listing items:', error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
    {
      field: 'downloadURL',
      headerName: 'URL',
      width: 300,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      ),
    },
  ];

  
  console.log("Rendered fileList:", fileList);

  return (
  
    <div className={  "container mx-10 my-5 flex flex-col"}
    style = {{height: 400, width: '100%'}}>
      <DataGrid rows={fileList} columns={columns} getRowId={(row) => row.name + row.author} pageSizeOptions= {[10]} />
      </div>
      
   
  );
};


export default FileTable;