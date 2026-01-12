"use client"
import { useState, ChangeEvent, useCallback } from 'react';
import axios from 'axios';
import { toBase64 } from '../utilities/file';
import {useAddBlogMutation } from '../Redux/Services/blogApi'
import { useAlert } from '../Context/AlertContext'
import { useRouter } from "next/navigation";
import {useLoggedInUser} from '../hooks/LoggedInUser';


export default function  BlogFormFunctions(){
  const { loggedInUserId } = useLoggedInUser();
  const router = useRouter();
  const { showAlert } = useAlert()
  const [addBlogMutation] = useAddBlogMutation();
  const [loading , setLoading] = useState(false)


 /* =========================
     🔹 STATES (SEPARATE)
  ========================= */

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')

  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  /* =========================
     ✍️ TEXT HANDLERS
  ========================= */

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  )

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  )

  const handleSummaryChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value),
    []
  )


   /* =========================
     🏷 TAGS HANDLING
  ========================= */

  const addTag = useCallback(() => {
    if (!tagInput.trim()) return

    setTags(prev =>
      prev.includes(tagInput.trim())
        ? prev
        : [...prev, tagInput.trim()]
    )
    setTagInput('')
  }, [tagInput])

   const removeTag = useCallback((index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleTagInput = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  },
  [setTagInput]
)

const handleTagKeyDown = useCallback(
  (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTag()
  },
  [addTag]
)



  
  /* =========================
     🖼 IMAGE HANDLING
  ========================= */


    const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile) return

      setFile(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile))
    },
    []
  )

    const handleImageUpload = async () => {
    if (!file) return null

    try {
      const base64File = await toBase64(file)
      const res = await axios.post('/api/upload', { file: base64File })

      if (res.status === 200) {
        setFile(null)
        return res.data.url
      }
      throw new Error("Image upload failed")
    } catch (error) {
      console.error("Image upload error:", error)
      throw error
    }
  }



  /* =========================
     ❌ CANCEL BLOG
  ========================= */

  const CancellBlog = useCallback(() => {
    setTitle('')
    setContent('')
    setSummary('')
    setTags([])
    setTagInput('')
    setFile(null)
    setImagePreview('')
  }, [])


  
 

 /* =========================
     🚀 SUBMIT BLOG
  ========================= */

  const addBlogs = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const imageURL = await handleImageUpload()

      const blogPayload = {
        blogTitle: title,
        blogContent: content,
        blogSummary: summary,
        blogTags: tags,
        blogImage: imageURL,
        userId: loggedInUserId,
      }

      await addBlogMutation(blogPayload).unwrap()

      showAlert('success', 'Article Published Successfully')
      router.push('/Blogs')
      CancellBlog()

    } catch (error) {
      console.error("Failed to add blog:", error)
      showAlert('error', 'Failed to publish')
    } finally {
      setLoading(false)
    }
  }

  return {
    // values
    title,
    content,
    summary,
    tags,
    tagInput,
    imagePreview,
    loading,
    setTags,
    setSummary,

    // setters / handlers
    setTagInput,
    handleTitleChange,
    handleContentChange,
    handleSummaryChange,
    handleImageChange,

    // actions
    addTag,
    removeTag,
    addBlogs,
    CancellBlog,
    handleTagInput,
    handleTagKeyDown
  }
}
