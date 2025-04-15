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
type UploadShotsState = {
    errors: {
        title?: string[];
        descripton?: string[];
        video?: string[];
        formError?: string[]
    }
}
export const uploadShortAction = async (prevState: UploadShotsState, formData: FormData): Promise<UploadShotsState> => {
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

    //clerk authenticationconss
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
        await prisma.shorts.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                video: result.data.video,
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