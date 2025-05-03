import { stackServerApp } from '@/stack'
import { SignIn } from '@stackframe/stack'
import React from 'react'

const page = async () => {

    const user = await stackServerApp.getUser()
    const app = stackServerApp.urls

    return (
        <>
            {user ? (
                <div className=''>
                    Plants inventory
                </div>
            ) : (<div className='h-[80vh] flex items-center justify-center'><SignIn /></div>)}
        </>
    )
}

export default page