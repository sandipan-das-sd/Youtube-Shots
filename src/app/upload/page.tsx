"use client";

import { uploadShortAction } from '@/actions/upload-short'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState, useState } from 'react'

export default function Upload() {
    const [formState, action, isPending] = useActionState(uploadShortAction, { errors: {} })
    const [videoUrl, setVideoUrl] = useState<string>("")
    
    const handleSubmit = (formData: FormData) => {
        formData.append('video', videoUrl)
        return action(formData)
    }
    
    return (
        <div className='max-w-md mx-auto p-6'>
            <h1 className='mb-6 text-2xl font-bold text-center'>Upload Shots</h1>
            <form action={handleSubmit}>
                <div className="mb-4">
                    <Label>Title</Label>
                    <Input
                        type='text'
                        placeholder='Title'
                        name='title'
                        className='mt-1'
                    />
                    {
                        formState.errors.title && (
                            <span className='text-red-500 text-sm'>{formState.errors.title}</span>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <Label>Description</Label>
                    <Input
                        type='text'
                        placeholder='Description'
                        name='description'
                        className='mt-1'
                    />
                    {
                        formState.errors.description && (
                            <span className='text-red-500 text-sm'>{formState.errors.description}</span>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <Label>Upload video</Label>
                    <Input
                        type='file'
                        name='video'
                        className='mt-1'
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setVideoUrl(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>

                <Button type='submit' className='w-full' disabled={isPending}>
                    Upload
                </Button>
            </form>
        </div>
    )
}