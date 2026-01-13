import { useCallback } from 'react'
import { useSuggestSummaryTagsMutation } from '../../Redux/Services/blogApi'
import { useAlert } from '../../Context/AlertContext'

interface AIGenerateProps {
  title: string
  content: string
  setSummary: (value: string) => void
  setTags: (value: string[]) => void
}

export default function useAIGenerate({
  title,
  content,
  setSummary,
  setTags,
}: AIGenerateProps) {

  const [suggestAI, { isLoading: aiLoading, error: aiError }] =
    useSuggestSummaryTagsMutation()

  const { showAlert } = useAlert()

  const handleSuggest = useCallback(async () => {
    if (!title || !content) {
      showAlert('error', 'Please add title & content first')
      return
    }

    try {
      const res = await suggestAI({
        blogTitle: title,
        blogContent: content,
      }).unwrap()

      // ✅ ONLY update what AI owns
      setSummary(res.summary)
      setTags(res.tags)

      showAlert('success', 'Generated Successfully')
    } catch (error) {
      console.error(error)
      showAlert('error', 'Generate failed')
    }
  }, [title, content, setSummary, setTags, suggestAI, showAlert])

  return { handleSuggest, aiLoading, aiError }
}
