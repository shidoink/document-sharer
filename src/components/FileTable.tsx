import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getStorage, ref, listAll, updateMetadata, getMetadata, deleteObject, StorageReference  } from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../config/firebase'
import { Box, TextField, Button } from '@mui/material';


const FileTable = () => {
  const storage = getStorage();
  const listRef = ref(storage, 'projectfiles');
  const [fileList, setFileList] = useState<{ name: string; author: string; downloadURL: string }[]>([]);
  const [itemRefs, setItemRefs] = useState<StorageReference[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<{ id: string; title: string } | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const listRef = ref(storage, "projectfiles");
      const allUsersList = await listAll(listRef);

      let allFiles: {
        name: string;
        author: string;
        downloadURL: string;
        uploadDate: string;
        fileType: string;
      }[] = [];

      for (const userFolder of allUsersList.prefixes) {
        const userFilesList = await listAll(userFolder);
        const promises = userFilesList.items.map((itemRef) => {
          return getMetadata(itemRef).then((metadata) => {
            if (metadata.customMetadata) {
              return {
                name: metadata.customMetadata.title,
                author: metadata.customMetadata.author,
                downloadURL: metadata.customMetadata.downloadurl,
                uploadDate: metadata.timeCreated,
                fileType: metadata.contentType,
              };
            }
            return null;
          });
        });

        const userFiles = await Promise.all(promises);
        allFiles = allFiles.concat(
          userFiles.filter((file): file is {
            name: string;
            author: string;
            downloadURL: string;
            uploadDate: string;
            fileType: string;
          } => file !== null)
        );
      }

      setFileList(allFiles);
      setItemRefs(allUsersList.items);
    };

    fetchFiles();
  }, []);


  const handleRowSelection = (row: any) => {
    setSelectedRow({ id: row.id, title: row.name });
    setUpdatedTitle(row.name);
  };
  
  const updateTitle = async () => {
    if (!selectedRow) return;
  
    const storage = getStorage();
    const listRef = ref(storage, 'projectfiles');
    const allUsersList = await listAll(listRef);
  
    for (const userFolder of allUsersList.prefixes) {
      const userFilesList = await listAll(userFolder);
  
      for (const itemRef of userFilesList.items) {
        const metadata = await getMetadata(itemRef);
        if (metadata.customMetadata) {
          if (
            metadata.customMetadata.title === selectedRow.title &&
            metadata.customMetadata.author === currentUserEmail
          ) {
            await updateMetadata(itemRef, {
              customMetadata: {
                ...metadata.customMetadata,
                title: updatedTitle,
              },
            });
  
            setFileList((prevFileList) =>
              prevFileList.map((file) => {
                if (file.name === selectedRow.title && file.author === currentUserEmail) {
                  return { ...file, name: updatedTitle };
                }
                return file;
              })
            );
  
            setSelectedRow(null);
            setUpdatedTitle('');
  
            break;
          } else if (
            metadata.customMetadata.title === selectedRow.title &&
            metadata.customMetadata.author !== currentUserEmail
          ) {
            alert("You do not have permission to update this file's title.");
            setSelectedRow(null);
            setUpdatedTitle('');
            break;
          }
        }
      }
    }
  };

  
// Delete Item
  const handleDelete = async (fileToDelete: { name: string; author: string; downloadURL: string }) => {
    if (currentUserEmail !== fileToDelete.author) {
      alert("You do not have permission to delete this file.");
      return;
    }
    let itemRefToDelete: StorageReference | null = null;

    const storage = getStorage();
    const listRef = ref(storage, "projectfiles");
    const allUsersList = await listAll(listRef);

    for (const userFolder of allUsersList.prefixes) {
      const userFilesList = await listAll(userFolder);
  
      for (const itemRef of userFilesList.items) {
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
        break;
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


  //GridCol definitions
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 350 },
    { field: 'uploadDate', headerName:'Upload Date', width:250},
    { field: 'fileType', headerName: 'File Type', width: 150},
    { field: 'downloadURL',
        headerName: 'Open',
        width: 75,
        renderCell: (params) => (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
          <i className="fa-sharp fa-regular fa-folder-open fa-2xl"></i>
          </a>),
    },
    {field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row)}><i className="fa-solid fa-trash fa-2xl"></i></button>
      ),
    },
  ];

  console.log("Rendered fileList:", fileList);

  //Mui Theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        paper: '#424242',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              backgroundColor: '#616161',
            },
            '&:hover .MuiFilledInput-root': {
              backgroundColor: '#4b4b4b',
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: '#616161',
            color: 'white',
            '&:hover': {
              backgroundColor: '#4b4b4b',
            }
          }
        }
      }
    }
  });

  return (
    <div className="flex justify-center bg-gray-900 min-h-screen">
      <div
        className="container mx-10 my-5 flex flex-col bg-gray-800 text-white shadow-lg rounded-lg"
        style={{ height: 400, width: '100%' }}
      >
        {selectedRow && (
          <ThemeProvider theme={darkTheme}>
            <Box my={3} display="flex" flexDirection="column" alignItems="center">
              <TextField
                label="Update Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                variant="filled"
                size="small"
                className="bg-white text-black"
                />
              <Button onClick={updateTitle} className="mt-2" variant="contained">
              Update
              </Button>
            </Box>
          </ThemeProvider>
)}
        <ThemeProvider theme={darkTheme}>
        <DataGrid
          className="bg-gray-700 text-white"
          rows={fileList}
          columns={columns}
          getRowId={(row) => row.name + row.author}
          pageSizeOptions={[10]}
          components={{
            Toolbar: GridToolbar,
          }}
          onRowClick={(params) => handleRowSelection(params.row)}
          rowHeight={32}
          scrollbarSize={10}
        />
        </ThemeProvider>
      </div>
    </div>
  );
};


export default FileTable;