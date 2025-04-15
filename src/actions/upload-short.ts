"use server";
import { auth } from '@clerk/nextjs/server';
import {z} from 'zod'

const uploadShortsSchema=z.object({
    title:z.string().min(3).max(100),
    description:z.string().max(500),
    video:z.string()
})
type UploadShotsState={
    errors:{
        title?:string[];
        descripton?:string[];
        video?:string[];
        formError?:string[]
    }
}
const uploadShortAction=async(prevState: UploadShotsState,formData:FormData):Promise<UploadShotsState>=>{
    const result=uploadShortsSchema.safeParse({
        title:formData.get('title'),
        description:formData.get('description'),
        video:formData.get('video')
    });
    if(!result.success)
    {
        return {
            errors:result.error.flatten().fieldErrors
        }
    }

    //clerk authenticationconss
    const {userId}=await auth();
    return{
        errors:{}
    }
}