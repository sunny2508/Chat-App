import {LoaderIcon} from "lucide-react"

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <LoaderIcon className="size-10 animate-spin"/>
    </div>
  )
}

export default PageLoader