import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import React from 'react'
import { Avatar, AvatarImage } from "../ui/avatar"
import { fetchUserByUsername } from "@/lib/actions"
import CardSideBar from "./card-sidebar"

async function SearchedUserCard({ content }: { content: string }) {
    const users = await fetchUserByUsername(content)
    return (
        <div>
            {
                users && users?.length > 0 ? users?.map(u => (
                    <Card className="">
                        <CardContent className="flex gap-4 items-center py-4 justify-between">
                            <div className=" flex gap-2">
                                <Avatar className='w-14 h-14 bg-black flex items-center justify-center' >
                                    <AvatarImage
                                        src={u.avatar ||
                                            "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"
                                        }
                                    />
                                </Avatar>
                                <aside className="">
                                    <div>{u.username}</div>
                                    <div>{u.fullName}</div>
                                </aside>
                            </div>
                            <div className="">
                                <CardSideBar userId={u._id} />
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <h2 className="text-white">No User Found</h2>
                )
            }
        </div>

    )
}

export default SearchedUserCard