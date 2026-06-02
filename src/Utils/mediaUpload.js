import { createClient } from '@supabase/supabase-js'

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bnNvenF1ZWtseWhxaXhxb3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTcxNzQsImV4cCI6MjA5NDIzMzE3NH0.kIa_9L_8iYMe94muEmAauDqZZbhJp7kUa-W6AapfFpg"
const url = "https://bvnsozqueklyhqixqowv.supabase.co"

const supabase = createClient(url, key)

export default function uploadMedia(file) {  // Add file parameter
    return new Promise((resolve, reject) => {
        if(file === null || !file) {
            reject("No file provided")
        } else {
            const timestamp = new Date().getTime()
            // Fix: Use file.name properly and sanitize if needed
            const fileName = `${file.name}_${timestamp}`

            supabase.storage
                .from("images")
                .upload(fileName, file)
                .then((response) => {
                    const publicUrl = supabase.storage
                        .from("images")
                        .getPublicUrl(fileName).data.publicUrl
                    resolve(publicUrl)
                })
                .catch((error) => {
                    reject(error.message)
                })
        }
    })
}