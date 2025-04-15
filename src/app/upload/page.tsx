import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Upload() {
    return (
        <div className='max-w-md mx-auto p-6'>

            <h1 className='mb-6 text-2xl font-bold text-center'> Upload Shots </h1>
            <form >
                <div className="mb-4">
                <Label>Title</Label>
                <Input
                    type='text'
                    placeholder='Title'
                    name='title'
                    className='mt-1'
                />
</div>

<div className='mb-4'>
                <Label>Description</Label>
                <Input
                    type='text'
                    placeholder='Description'
                    name='description'
                    className='mt-1'
                />
</div>

<div className='mb-4'>
                <Label>Upload video</Label>
                <Input
                    type='file'
                    
                    name='video'
                    className='mt-1'
                />
</div>

<Button>
    Upload 
</Button>
            </form>
        </div>
    )
}
