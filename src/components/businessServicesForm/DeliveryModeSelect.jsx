import PropTypes from 'prop-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import tagSchema from '@/schemas/tagSchema'
import { cn } from '@/lib/utils'

const generateSelectItems = (values) => {
  const items = []
  for (let value of values) {
    items.push(<SelectItem value={value} children={value} key={value} />)
  }
  return items
}

const DeliveryModeSelect = (props) => {
  return (
    <Select
      className={cn(props.className)}
      value={props.field.value}
      defaultValue={props.field.value}
      onValueChange={props.field.onChange}
    >
      <SelectTrigger className={'w-full'}>
        <SelectValue placeholder={`Select a delivery mode`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        {generateSelectItems(tagSchema.delivery_mode)}
      </SelectContent>
    </Select>
  )
}

export default DeliveryModeSelect

DeliveryModeSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
}

DeliveryModeSelect.defaultProps = {
  className: '',
  field: null,
}
