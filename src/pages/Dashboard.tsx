import { Suspense } from "react"
import FileUploader from "../components/FileUploader"
import FileTable from "../components/FileTable"

const Dashboard = () => {
    
  return (
    <div className="h-full">
      Dashboard

    <FileUploader/>
    
    <FileTable/>
    
    </div>
  )
}

export default Dashboard
