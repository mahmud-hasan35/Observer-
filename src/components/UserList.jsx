import axios from "axios";
import UseItems from "./UseItems";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const getData = async () => {
  const response = await axios.get('http://localhost:3000/users')
  return response.data;
}

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const itemsPage = 5;

  const {data: users, error,isFetching }
  = useQuery({
    queryKey: ["users"], queryFn: getData,
    // retry: stop()
    // staleTime: 2000,
    refetchInterval: 500
  });
  const index = (currentPage -1) * itemsPage;
  const endIndex = (index + itemsPage);
  const usersAllow = users ? users.slice(index , endIndex) : [];

  const handleNext = () => {
    if (endIndex < users.length) setCurrentPage((prev => prev +1))
  }
const handlePrev = () => {
  if (index > 0) setCurrentPage((prev => prev -1))
}

  // if (isFetching) return <div className="text-2xl font-bold  w-6/12 mt-24 text-center">Data is loading</div>
  // if(error) return <div>Somthing Error {error.message}</div>
  
  return (
    <>
    {!error && (
    <div className="w-6/12">
      <div className="p-2 border">
        <h2 className="font-semibold text-2xl mb-3">All User Here</h2>
        <div className="flex flex-wrap">
        {usersAllow.map((user) => (
                <UseItems key={user.id} user={user} />
              ))}
        </div>
        <div className="text-center p-3">
        <button
                className={`bg-indigo-700 text-white p-1 px-3 rounded mr-3 ${index === 0 && "opacity-50"}`}
                onClick={handlePrev}
                disabled={index === 0}
              >
                Prev
              </button>
              <button
                className={`bg-indigo-700 text-white p-1 px-3 rounded ${endIndex >= (users?.length || 0) && "opacity-50"}`}
                onClick={handleNext}
                disabled={endIndex >= (users?.length || 0)}
              >
                Next
              </button>
        </div>
      </div>
      </div>

    )}
    </>
  )
}