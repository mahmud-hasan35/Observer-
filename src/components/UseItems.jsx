
const clickHandler = () => {
  console.log('ok');
  
  
}

export default function UseItems({user}) {
  return (
    <div className=" w-6/12 text-center ">
    <div className="p-3">
        <div className=" border p-2 bg-stone-100">
      <p className="font-semibold text-xl">{user.name}</p>
      <p>{user.username}</p>
      <p className="text-red-400 ">{user.email}</p>
      <button onClick={clickHandler} className="bg-indigo-700 text-white p-1 px-2 rounded mt-3">View Details</button>
    </div>
    </div>
  </div>
  
  )
}