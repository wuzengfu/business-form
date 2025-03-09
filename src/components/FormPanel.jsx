'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { setStepNum } from '@/lib/store/businessFormStepSlice'

const BusinessForm = dynamic(() => import('@/components/forms/BusinessForm'))
const AddressForm = dynamic(() => import('@/components/forms/AddressForm'))
const BusinessHoursForm = dynamic(() => import('@/components/forms/BusinessHoursForm'))
const ServiceForm = dynamic(() => import('@/components/forms/ServiceForm'))

const tabs = [
  { title: 'Business Information', component: BusinessForm },
  { title: 'Address', component: AddressForm },
  { title: 'Business Hours', component: BusinessHoursForm },
  { title: 'Services', component: ServiceForm },
]

const FormPanel = (props) => {
  const {stepNum, maxStepNum} = useSelector(state => state.businessFormStep)
  const dispatch = useDispatch()

  return (
    <Tabs className={...[props.className, 'lg:w-3/5 md:w-5/6 xs:w-full overflow-y-auto max-h-screen']}
          value={stepNum.toString()}>
      <TabsList className={`grid w-full grid-cols-4`}>
        {tabs.map((tab, index) =>
          <TabsTrigger value={index.toString()}
                       key={tab.title}
                       disabled={index > maxStepNum}
                       onClick={() => dispatch(setStepNum(index))}
                       className={index <= maxStepNum && 'font-semibold'}
          >{`${index + 1}. ${tab.title}`}</TabsTrigger>)
        }
      </TabsList>
      {tabs.map((tab, index) =>
        <TabsContent value={index.toString()} key={tab.title}>
          {<tab.component />}
        </TabsContent>)}
    </Tabs>
  )
}

export default FormPanel
