import { useEffect, useState } from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { getStorage, ref, listAll, getDownloadURL, updateMetadata, getMetadata } from "firebase/storage";


const FileTable = () => {

    const storage = getStorage();
    const listRef = ref(storage, 'projectfiles');
   

    listAll(listRef)
    .then( (res) => {
    res.items.forEach((itemRef) => {
  
    (getMetadata(itemRef))
      .then((metadata)=>{
      if(metadata.customMetadata){
      console.log(metadata.customMetadata)
    }
 })

});
}).catch((error) => {
alert('error!')
});




  return (
    <>
    <div>
    <button> HEllO</button>
    </div>
    </>
  )
  }

export default FileTable