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

const ClassSizeSelect = (props) => {
  return (
    <Select
      className={cn(props.className)}
      value={props.field.value}
      defaultValue={props.field.value}
      onValueChange={props.field.onChange}
    >
      <SelectTrigger className={'w-full'}>
        <SelectValue placeholder={`Select a class size`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        {generateSelectItems(tagSchema.class_size)}
      </SelectContent>
    </Select>
  )
}

export default ClassSizeSelect

ClassSizeSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
}

ClassSizeSelect.defaultProps = {
  className: '',
  field: null,
}
