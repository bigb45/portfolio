import { generateRandomId } from "@/app/utils";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { todo } from "node:test";


// todo: handle errors
export async function GET() {
    console.log("getting the blogs")
    const blogList = await prisma.blog.findMany({
        orderBy: [
            {
               isPinned: 'desc' 
            }
        ]
    })
    return NextResponse.json(blogList)
    
}



export async function POST(req: Request) {
    const request = await req.json()
    console.log("putting blog")
    console.log(request)
    const blogId = generateRandomId();
    const result = await prisma.blog.create(
       {data: {id: blogId, ...request}}
    )
    console.log({result})
    return NextResponse.json({ success: true, }, { status: 200 })
}