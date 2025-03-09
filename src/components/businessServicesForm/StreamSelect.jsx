import PropTypes from 'prop-types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

const StreamSelect = (props) => {
  return (
    <Select
      className={cn(props.className)}
      value={props.field.value}
      defaultValue={props.field.value}
      onValueChange={props.field.onChange}
    >
      <SelectTrigger className={'w-full'}>
        <SelectValue placeholder={`Select a stream`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        {generateSelectItems(tagSchema.stream)}
      </SelectContent>
    </Select>
  )
}

export default StreamSelect

StreamSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
}

StreamSelect.defaultProps = {
  className: '',
  field: null,
}
