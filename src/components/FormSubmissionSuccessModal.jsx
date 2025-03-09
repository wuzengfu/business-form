'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccessModalOpen } from '@/lib/store/businessFormModalSlice'

const FormSubmissionSuccessModal = () => {
  const isSuccessModalOpen = useSelector(
    (state) => state.businessFormModal.isSuccessModalOpen
  )
  const dispatch = useDispatch()

  return (
    <Dialog
      open={isSuccessModalOpen}
      defaultOpen={false}
      onOpenChange={(open) => {
        if (open) return
        dispatch(setSuccessModalOpen(false))
        setTimeout(() => window.location.reload(), 100)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thank you!</DialogTitle>
          <DialogDescription>
            We have received your submission!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogTrigger asChild>
            <Button type="submit" variant="secondary">
              Close
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormSubmissionSuccessModal
