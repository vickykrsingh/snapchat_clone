"use client"
import { Button } from "@/components/ui/button"
import { acceptRequest, declineRequest } from "@/lib/actions"

function AcceptRequest({userId}:{userId:string}){
    const acceptRequestHandler = async (userId:string) => {
        await acceptRequest(userId)
    }
    return (
        <Button size={'sm'} onClick={()=>acceptRequestHandler(userId)}>Accept</Button>
    )
}


function DeclineRequest({userId}:{userId:string}){
    const declineRequestHandler = async (userId:string) => {
        await declineRequest(userId)
    }
    return (
        <Button size={'sm'} onClick={()=>declineRequestHandler(userId)}>Decline</Button>
    )
}

export { AcceptRequest,DeclineRequest}