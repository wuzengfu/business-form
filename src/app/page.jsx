import FormPanel from '@/components/FormPanel'
import dynamic from 'next/dynamic'

const FormSubmissionSuccessModal = dynamic(
  () => import('@/components/FormSubmissionSuccessModal')
)
const FormSubmissionFailureModal = dynamic(
  () => import('@/components/FormSubmissionFailureModal')
)

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <FormPanel />
      <FormSubmissionSuccessModal />
      <FormSubmissionFailureModal />
    </div>
  )
}
