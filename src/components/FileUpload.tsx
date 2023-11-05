'use client'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Inbox, Loader2 } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const FileUpload = () => {
    const [uploading, setUploading] = React.useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: async ({ file_key, file_name }: { file_key: string, file_name: string }) => {
            const response = await axios.post('/api/create-resume', {
                file_key,
                file_name

            });
            return response.data;
        }
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Please Upload a Resume less than 10MB')
                return
            }
            try {
                setUploading(true)
                const data = await uploadToS3(file)
                if (!data?.file_key || !data?.file_name) {
                    toast.error('keyfile or filename not found')
                    return
                }
                mutate(data, {
                    onSuccess: (data) => {
                        toast.success(data.message)
                    },
                    onError: (error) => {
                        toast.error("error uploading resume")
                    }
                })
            } catch (error) {
                console.log(error)

            } finally {
                setUploading(false)
            }
        }

    })
    return (
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: 'border-dashed border-2 rouded-xl cursor-pointer bg-gray-50 py-10 flex justify-center items-center flex-col'
            })}>
                <input {...getInputProps()} />
                {uploading || isPending ? (
                    <>
                        {/* loading state*/}
                        <Loader2 className='h-10 w-10 text-blue-500 animate-spin' />
                        <p className='mt-2 text-sm text-slate-400'>Processing data with GPT...</p>
                    </>
                ) :
                    (
                        <>
                            <Inbox className="w-10 h-10 text-blue-500" />
                            <p className='mt-2 text-sm text-slate-400'>Drop Resume Here</p>
                        </>

                    )}
            </div>
        </div >
    )
}

export default FileUpload
