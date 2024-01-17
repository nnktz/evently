import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import { generateComponents } from '@uploadthing/react'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
