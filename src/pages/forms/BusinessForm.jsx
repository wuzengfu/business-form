'use client'

import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBusiness } from '@/lib/store/businessSlice'
import { incrementStepNum } from '@/lib/store/businessFormStepSlice'

const formSchema = z.object({
  name: z.string().min(1, 'Business name should not be empty!'),
  description: z.string().min(1, 'Business Description should not be empty!'),
  contact_email: z
    .string()
    .min(1, 'Please enter your email!')
    .email('Please enter a valid email!'),
  google_place_id: z.string().min(1, 'Google Place ID should not be empty!'),
  facebook_page_id: z.string().min(1, 'Facebook Page ID should not be empty!'),
  facebook_page_link: z
    .string()
    .min(1, 'Facebook Page Link should not be empty!')
    .url('Please enter a valid link!'),
  instagram_page_link: z
    .string()
    .min(1, 'Instagram Page Link should not be empty!')
    .url('Please enter a valid link!'),
  whatsapp_link: z
    .string()
    .min(1, 'Whatsapp Link should not be empty!')
    .url('Please enter a valid link!'),
  average_rating: z.coerce
    .number()
    .lte(5, 'The rating should not exceed 5.')
    .positive('The rating should not be negative!'),
})

const BusinessForm = (props) => {
  const businessData = useSelector((state) => state.businessForm.business)
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: businessData,
  })

  const onSubmit = (values) => {
    dispatch(updateBusiness(values))
    dispatch(incrementStepNum())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        {/*<CardDescription>*/}
        {/*  Make changes to your account here. Click save when you're done.*/}
        {/*</CardDescription>*/}
      </CardHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Mr Cat Academy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tution@mrcat.net" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="google_place_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Place ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ChIJN1t_tDeuEmsRNsoyG03frY4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_page_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Page ID</FormLabel>
                    <FormControl>
                      <Input placeholder="262576896966693" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facebook_page_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Page Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/MrCat"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_page_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram Page Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.instagram.com/MrCat/"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="whatsapp_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://api.whatsapp.com/send?phone=658498105&text=Hi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="average_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Rating</FormLabel>
                    <FormControl>
                      <Input placeholder={'e.g. 3.5'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={'Describe your business...'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className={'flex justify-end'}>
            <Button type="submit">
              Next <ChevronRight />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default BusinessForm
