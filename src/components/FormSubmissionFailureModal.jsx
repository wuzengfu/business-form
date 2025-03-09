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
import { setErrorModalOpen } from '@/lib/store/businessFormModalSlice'

const FormSubmissionFailureModal = () => {
  const isErrorModalOpen = useSelector(
    (state) => state.businessFormModal.isErrorModalOpen
  )
  const dispatch = useDispatch()

  return (
    <Dialog
      open={isErrorModalOpen}
      defaultOpen={false}
      onOpenChange={(open) => {
        if (open) return
        dispatch(setErrorModalOpen(false))
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            Something went wrong! Please try again!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => dispatch(setErrorModalOpen(false))}
            >
              Close
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormSubmissionFailureModal
