"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "./userActions";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: String) {
    try {
        const currentUserId = await getUserId();
        const whereClause: any = { userId: currentUserId };
        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "Insensitive",
            };
        }
        const userPlants = await prisma.plants.findMany({
            where: whereClause,
        })
        revalidatePath("/");
        return { success: true, userPlants };
    } catch (error) {
        console.log("plantActions:", error)
        throw new Error("Failed to fetch plants")
    }
}

export async function getPlantById(id: string) {
    return await prisma.plants.findUnique({
        where: { id },
    })
}