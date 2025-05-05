import { getPlants } from '@/actions/plantActions'
import InventoryTable from '@/components/InventoryTable'
import { stackServerApp } from '@/stack'
import { SignIn } from '@stackframe/stack'
import React from 'react'

const page = async () => {

    const user = await stackServerApp.getUser()
    const app = stackServerApp.urls
    const plant = await getPlants()

    return (
        <>
            {user ? (
                <div>
                    <InventoryTable plants={plant}/>
                </div>
            ) : (<div className='h-[80vh] flex items-center justify-center'><SignIn /></div>)}
        </>
    )
}

export default page