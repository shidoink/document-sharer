import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { getStorage, ref, listAll, getDownloadURL, updateMetadata, getMetadata } from "firebase/storage";

interface DocObj{
  author?: String
  title?: string
  downloadurl?: string
}

const storage = getStorage();
const listRef = ref(storage, 'projectfiles');

const doclist: DocObj[] = []
let docobj: DocObj ={
  author: '',
  title:'',
  downloadurl:'',

}


 listAll(listRef)
  .then( (res) => {
    res.items.forEach((itemRef) => {
      (getDownloadURL(itemRef))
      .then((url)=>{
        const newMetadata={
          customMetadata:{
          'downloadurl': url
          }
        }
        updateMetadata(itemRef, newMetadata)
      });
    (getMetadata(itemRef))
     .then((metadata)=>{
       if(metadata.customMetadata){
       doclist.push(metadata.customMetadata)}
       console.log(doclist)
      
     })

    });
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
    <>
    
    <div className= 'grid-cols-3'>
     
      {doclist.map((doc)=>(
        <div > 
          <p>{doc.author}</p>
          <p> {doc.title}</p>
          <div>
          <a href= {doc.downloadurl} target="_blank">
          <button>Posts</button>
          </a>
    </div>
        </div>
        
      ))}
      
    </div>
    </>
  )
}

export default FileTable