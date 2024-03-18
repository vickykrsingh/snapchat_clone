"use client"
import { checkFriend, removeFriend, sendRequest } from '@/lib/actions'
import { UserCheck, UserPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardSideBar({ userId }: { userId: string }) {
  const [status,setStatus] = useState(false)
  const handleSendRequest = async (id:string) => {
    const res = await sendRequest(userId)
    if(res){
      setStatus((prev)=>prev=true)
    }
  }
  const handleRemoveRequest = async (id:string) => {
    const res = await removeFriend(userId)
    if(res){
      setStatus((prev)=>prev=true)
    }
  }
  const isFriend = async () => {
    const res = await checkFriend(userId)
    res && setStatus((prev)=>prev=res)
  }
  useEffect(()=>{
    isFriend()
  },[])
  return (
    <div>
      {!status ? <UserPlus onClick={()=>handleSendRequest(userId)} /> : <UserCheck onClick={()=>handleRemoveRequest(userId)}/>}
    </div>
  )
}

export default CardSideBar