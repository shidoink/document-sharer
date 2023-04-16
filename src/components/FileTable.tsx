import {useState} from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";


const storage = getStorage();

const listRef = ref(storage, 'projectfiles');
const itemRef = ref(storage, 'projectfiles') 
console.log('listref' + listRef)




listAll(listRef)
  .then( (res) => {
    res.items.forEach((itemRef) => {
      (getDownloadURL(itemRef))
      .then((url)=>{
        console.log(url)
      })});
 }).catch((error) => {
    alert('error!')
  });

  listAll(listRef)
  .then( (res) => {
    res.items.forEach((itemRef) => {
      (getMetadata(itemRef))
      .then((metadata)=>{
        console.log(metadata.customMetadata)
      })});
  }).catch((error) => {
    alert('error!')
  });


const columns: GridColDef[]= [
    //{field:'id', headerName:'ID', width:90, hideable:true},
    {field: 'filename', headerName: 'File Name', flex:1},
    {field: 'author', headerName: 'Author', flex:1},
    {field: 'title', headerName: 'Title', flex:1}
    
]

const FileTable = () => {
  return (
    <div>
      
    </div>
  )
}

export default FileTable
