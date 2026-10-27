import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className='h-screen bg-gray-400 flex justify-center items-center '>
      <ImSpinner2 className="animate-spin text-6xl" />
    </div>
  )
}
