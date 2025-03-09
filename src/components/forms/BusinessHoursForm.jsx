import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { ChevronRight } from 'lucide-react'
import { object, z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateBusinessHours } from '@/lib/store/businessSlice'
import { incrementStepNum } from '@/lib/store/businessFormStepSlice'
import TimeSelect from '@/components/forms/businessHoursForm/TimeSelect'
import businessHoursSchema, {
  availableDays,
} from '@/schemas/businessHoursSchema'

const formSchema = object({
  hours: z
    .object({
      day_name: z.string(),
      open_time: z.string().min(1, 'Select an open time!'),
      close_time: z.string().min(1, 'Select an close time!'),
    })
    .array(),
})

const generateDefaultValues = (hoursData) => {
  if (hoursData.length > 0) {
    return hoursData
  }

  const values = []
  for (let day of availableDays) {
    const schema = JSON.parse(JSON.stringify(businessHoursSchema))
    schema.day_name = day
    values.push(schema)
  }

  return values
}

const BusinessHoursForm = () => {
  const hoursData = useSelector((state) => state.businessForm.businessHours)
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { hours: generateDefaultValues(hoursData) },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'hours',
  })

  const onSubmit = (values) => {
    dispatch(updateBusinessHours(values.hours))
    dispatch(incrementStepNum())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Hours</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            {fields.map((field, i) => (
              <Card
                className="w-full pl-7 pr-7 pt-1 pb-1 flex flex-row items-center justify-between"
                key={field.id}
              >
                <p className="text-lg font-semibold w-32 flex-none inline-block">
                  {field.day_name}
                </p>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name={`hours.${i}.open_time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TimeSelect field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`hours.${i}.close_time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TimeSelect field={field} isClosingTime={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            ))}
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

export default BusinessHoursForm
