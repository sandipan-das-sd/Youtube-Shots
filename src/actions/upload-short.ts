"use server";

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'

const uploadShortsSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(500),
    video: z.string()
})

type UploadShortsState = {
    errors: {
        title?: string[];
        description?: string[]; // Fixed the typo here (was 'descripton')
        video?: string[];
        formError?: string[]
    }
}

export const uploadShortAction = async (prevState: UploadShortsState, formData: FormData): Promise<UploadShortsState> => {
    const result = uploadShortsSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        video: formData.get('video')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // Clerk authentication
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formError: ['You must be logged in to upload shorts']
            }
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    try {
        if (!user?.id) {
            return {
                errors: {
                    formError: ['User not found']
                }
            }
        }
        
        // Changed 'video' to 'url' to match the schema
        await prisma.shorts.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                url: result.data.video, // Changed from 'video' to 'url'
                userId: user.id
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }
        else {
            return {
                errors: {
                    formError: ['Something went wrong']
                }
            }
        }
    }
    
    revalidatePath("/")
    redirect("/")
}