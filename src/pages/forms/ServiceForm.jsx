import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { object, z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import defaultService from '@/schemas/serviceSchema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ChevronRight, PlusIcon, Trash2 } from 'lucide-react'
import { updateServices } from '@/lib/store/businessSlice'
import { incrementStepNum } from '@/lib/store/businessFormStepSlice'
import LevelSelect from '@/components/businessServicesForm/LevelSelect'
import SubjectSelect from '@/components/businessServicesForm/SubjectSelect'
import StreamSelect from '@/components/businessServicesForm/StreamSelect'
import ClassSizeSelect from '@/components/businessServicesForm/ClassSizeSelect'
import DeliveryModeSelect from '@/components/businessServicesForm/DeliveryModeSelect'

const formSchema = object({
  services: z
    .object({
      name: z.string().min(1, 'Service name cannot be empty!'),
      tags: z.object({
        level: z.string().min(1, 'Level should not be empty!'),
        subject: z.string().min(1, 'Subject should not be empty!'),
        stream: z.string().min(1, 'Stream should not be empty!'),
        class_size: z.string().min(1, 'Class should not be empty!'),
        delivery_mode: z.string().min(1, 'Delivery Mode should not be empty!'),
      }),
      pricing: z.object({
        price: z
          .string()
          .min(1, 'Service price should not be empty!')
          .regex(new RegExp(/^\d*\.?\d*$/), 'Please enter a valid number!'),
        currency: z.string(),
        pricing_unit: z.string(),
        variant_name: z.string(),
      }),
    })
    .array(),
})

const generateServicesData = (servicesData) => {
  if (servicesData.length > 0) {
    return servicesData
  }

  return [defaultService]
}

const ServiceForm = () => {
  const servicesData = useSelector((state) => state.businessForm.services)
  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { services: generateServicesData(servicesData) },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'services',
  })

  const onSubmit = (form, isSubmitted = false) => async (e) => {
    await form.handleSubmit(() => {
      if (isSubmitted) {
        dispatch(updateServices(form.getValues().services))
      }
    }, () => {
      if (!isSubmitted) {
        form.clearErrors(`services.${form.getValues().services.length - 1}`)
      }
    })(e)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Services</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={onSubmit(form)}>
          <CardContent className="space-y-5">
            {fields.map((field, i) => (
              <Card className={'relative'} key={field.id}>
                <Button
                  className={'absolute top-1 right-2'}
                  variant={'outline'}
                  size={'icon'}
                  onClick={() => remove(i)}
                >
                  <Trash2 color={'red'} />
                </Button>
                <CardContent className={'w-full flex flex-col gap-5'}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`services.${i}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Primary 1 Chinese Tuition"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${i}.pricing.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 35" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`services.${i}.tags.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <LevelSelect field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${i}.tags.subject`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <SubjectSelect field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${i}.tags.stream`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stream</FormLabel>
                          <FormControl>
                            <StreamSelect field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`services.${i}.tags.class_size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Size</FormLabel>
                          <FormControl>
                            <ClassSizeSelect field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${i}.tags.delivery_mode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Mode</FormLabel>
                          <FormControl>
                            <DeliveryModeSelect field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant={'outline'}
              className={'w-full border-dashed'}
              onClick={() => append(JSON.parse(JSON.stringify(defaultService)))}
            >
              <PlusIcon />
              ADD
            </Button>
          </CardContent>
          <CardFooter className={'flex justify-end'}>
            <Button type="button" onClick={onSubmit(form, true)}>
              Next <ChevronRight />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default ServiceForm
