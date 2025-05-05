"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Filter, Search } from "lucide-react";
import { Combobox } from "./Combobox";
import { useState } from "react";
import { getPlants } from "@/actions/plantActions";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

// const plants = [
//     {
//         id: "1",
//         name: "Aloe Vera",
//         category: "Desert",
//         price: "2000",
//         stock: "6000",
//     },
//     {
//         id: "2",
//         name: "Ficus Bonsai",
//         category: "Indoor",
//         price: "3500",
//         stock: "5000",
//     },
//     {
//         id: "3",
//         name: "Cactus",
//         category: "Desert",
//         price: "8000",
//         stock: "12000",
//     },
//     {
//         id: "4",
//         name: "Snake Plant",
//         category: "Indoor",
//         price: "1500",
//         stock: "8000",
//     },
//     {
//         id: "5",
//         name: "Rose",
//         category: "Flowering",
//         price: "1200",
//         stock: "15000",
//     },
//     {
//         id: "6",
//         name: "Lavender",
//         category: "Herbs",
//         price: "950",
//         stock: "11000",
//     },
//     {
//         id: "7",
//         name: "Bamboo Palm",
//         category: "Indoor",
//         price: "1800",
//         stock: "3000",
//     },
//     {
//         id: "8",
//         name: "Tulip",
//         category: "Flowering",
//         price: "3000",
//         stock: "4000",
//     },
//     {
//         id: "9",
//         name: "Lily",
//         category: "Flowering",
//         price: "2000",
//         stock: "5000",
//     },
//     {
//         id: "10",
//         name: "Water Lily",
//         category: "Aquatic",
//         price: "4000",
//         stock: "1500",
//     },
//     {
//         id: "11",
//         name: "Mint",
//         category: "Herbs",
//         price: "800",
//         stock: "10000",
//     },
//     {
//         id: "12",
//         name: "Pothos",
//         category: "Indoor",
//         price: "1200",
//         stock: "7000",
//     },
//     {
//         id: "13",
//         name: "Orchid",
//         category: "Flowering",
//         price: "3000",
//         stock: "3500",
//     },
//     {
//         id: "14",
//         name: "Basil",
//         category: "Herbs",
//         price: "1100",
//         stock: "8000",
//     },
//     {
//         id: "15",
//         name: "Palm Tree",
//         category: "Tropical",
//         price: "15000",
//         stock: "2000",
//     },
// ];

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plant
}


export default function InventoryTable({plants}: InventoryTableProps) {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPlants = plants?.userPlants?.filter(
        (plant:any) =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === "" || plant.category === selectedCategory)
    )

    return (
        <div className="w-full flex flex-col gap-5">

            <div className="flex items-center gap-3">
                <Search />
                <Input placeholder="Search for plants" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>

                <Filter />
                <Combobox value={selectedCategory} onChange={(val)=>setSelectedCategory(val)} />
            </div>


            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlants.map((plant:any) => {

                            const joinedName = plant.name.toLowerCase().replace(/\s+/g, "-");
                            const slug = `${plant.id}-${joinedName}`;
                            const plantURL = `/plants/${slug}`;

                            return (
                            <TableRow key={plant.id} onClick={()=>router.push(plantURL)}>
                                <TableCell className="font-medium">{plant.name}</TableCell>
                                <TableCell>{plant.category}</TableCell>
                                <TableCell>{plant.price}</TableCell>
                                <TableCell>{plant.stock}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-4">
                                        <h1>Edit</h1>
                                        <h1>Delete</h1>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}
