'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const BusinessForm = dynamic(() => import('@/pages/forms/BusinessForm'))
const AddressForm = dynamic(() => import('@/pages/forms/AddressForm'))
const BusinessHoursForm = dynamic(() => import('@/pages/forms/BusinessHoursForm'))
const ServiceForm = dynamic(() => import('@/pages/forms/ServiceForm'))

const tabs = [
  { title: 'Business Information', component: BusinessForm },
  { title: 'Address', component: AddressForm },
  { title: 'Business Hours', component: BusinessHoursForm },
  { title: 'Services', component: ServiceForm },
]

const FormPanel = (props) => {
  const [maxStepNum, setMaxStepNum] = useState(0)
  const [currentStepNum, setCurrentStepNum] = useState(0)

  return (
    <Tabs className={...[props.className, 'lg:w-3/5 md:w-5/6 xs:w-full']}
          value={currentStepNum.toString()}>
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map((tab, index) =>
          <TabsTrigger value={index.toString()}
                       key={tab.title}
                       disabled={index > maxStepNum}
                       onClick={() => setCurrentStepNum(index)}
                       className={index <= maxStepNum && 'font-semibold'}
          >{`${index + 1}. ${tab.title}`}</TabsTrigger>)
        }
      </TabsList>
      {tabs.map((tab, index) =>
        <TabsContent value={index.toString()} key={tab.title}>
          {<tab.component maxStepNum={maxStepNum}
                          setCurrentStepNum={setCurrentStepNum}
                          setMaxStepNum={setMaxStepNum}
                          stepNum={index} />}
        </TabsContent>)}
    </Tabs>
  )
}

export default FormPanel
