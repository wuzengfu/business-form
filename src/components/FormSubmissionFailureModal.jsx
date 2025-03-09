'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
    <Dialog open={isErrorModalOpen} defaultOpen={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            Something went wrong! Please try again!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => dispatch(setErrorModalOpen(false))}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormSubmissionFailureModal
