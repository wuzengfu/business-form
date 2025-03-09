import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ChevronRight } from 'lucide-react'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateAddress } from '@/lib/store/businessSlice'
import { incrementStepNum } from '@/lib/store/businessFormStepSlice'
import { getFullAddress } from '@/apis'
import { Textarea } from '@/components/ui/textarea'
import useThrottle from '@/hooks/useThrottle'

const formSchema = z.object({
  building_number: z.string().min(1, 'Building number should not be empty!'),
  street_name: z.string().min(1, 'Street name should not be empty!'),
  unit_number: z.string().min(1, 'Unit number should not be empty!'),
  postal_code: z.string().regex(new RegExp('^[0-9]{1,6}$'), 'Postal code must be 6 digits'),
  full_address: z.string().min(1, 'Invalid postal code!'),
  latitude: z.string(),
  longitude: z.string(),
})

const setFullAddress = async (postalCode, form) => {
  try {
    const res = await getFullAddress(postalCode)
    const fullAddress = await res.json()
    if (fullAddress?.found === 0) {
      form.setValue('full_address', '')
      form.setValue('latitude', '')
      form.setValue('longitude', '')
    } else {
      form.setValue('full_address', fullAddress.results[0].ADDRESS, { shouldValidate: true })
      form.setValue('latitude', fullAddress.results[0].LATITUDE)
      form.setValue('longitude', fullAddress.results[0].LONGITUDE)
    }
  } catch (error) {
    form.setValue('full_address', '')
    form.setValue('latitude', '')
    form.setValue('longitude', '')
    console.error('Server not responding for getting full address!')
  }
}

const AddressForm = () => {
  const addressData = useSelector((state) => state.businessForm.address)
  const dispatch = useDispatch()
  const setFullAddressThrottled = useThrottle(setFullAddress, 800)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: addressData,
  })

  const onSubmit = (values) => {
    dispatch(updateAddress(values))
    dispatch(incrementStepNum())
  }

  const onPostalCodeValueChange = (onValueChange) => async (e) => {
    onValueChange(e)
    if (e.target.value.length === 6) {
      setFullAddressThrottled(e.target.value, form)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Address</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="building_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Bishan Community Club" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Name</FormLabel>
                    <FormControl>
                      <Input placeholder="51 Bishan St. 13" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unit_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input placeholder="#03-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="579799" {...field} onChange={onPostalCodeValueChange(field.onChange)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="full_address"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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

export default AddressForm
