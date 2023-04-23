import { Suspense } from "react"
import FileUploader from "../components/FileUploader"
import FileTable from "../components/FileTable"

const Dashboard = () => {
    
  return (
    <div className="h-full flex flex-col justify-center">
      
      <div className='flex justify-center bg-gray-800 text-white p-4'>
        <p>Dashboard</p>
      </div>
    <FileUploader/>
    
    <FileTable/>
      
    </div>
  )
}

export default Dashboard
