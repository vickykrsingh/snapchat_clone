import CardSideBar from '@/components/shared/card-sidebar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchCurrentUserDetail } from '@/lib/actions'
import { IUserDocument } from '@/models/userModel';
import React from 'react'
import { AcceptRequest,DeclineRequest } from './requestHandler';

async function NotificationPage() {
    const users = await fetchCurrentUserDetail();
    return (
        <div className='bg-black min-h-screen w-full text-white px-14 md:px-16 lg:px-24 xl:px-32 pt-2'>
            {
                users && users.recievedRequests.length>0 ? users?.recievedRequests.map((u) => (
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
                            <div className="flex gap-2">
                                <AcceptRequest userId={u._id} />
                                <DeclineRequest userId={u._id} />
                            </div>
                        </CardContent>
                    </Card>
                )):(
                    <h2 className='text-white text-xl text-muted text-center pt-5'>No More Request</h2>
                )
            }
        </div>
    )
}

export default NotificationPage


