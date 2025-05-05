import { getPlantById } from '@/actions/plantActions'
import PlantCard from '@/components/PlantCard'
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';
import React from 'react'

export async function generateMetadata({ params }: { params: { slug: string }; }) {

    // Extract the id from the slug by splitting on the delimiter
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);

    return {
        title: plant ? plant.name : "Plant Details",
        description: plant ? plant.description : "Plant details page",
    };
}

async function page({ params }: { params: { slug: string } }) {
    console.log("Hello")


    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);

    if (!user) {
        return <SignIn />
    }

    return (
        <div>
            <PlantCard plant={plant} />
        </div>
    )
}

export default page