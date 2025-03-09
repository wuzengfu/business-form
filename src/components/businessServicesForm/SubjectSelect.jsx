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

const SubjectSelect = (props) => {
  return (
    <Select
      className={cn(props.className)}
      value={props.field.value}
      defaultValue={props.field.value}
      onValueChange={props.field.onChange}
    >
      <SelectTrigger className={'w-full'}>
        <SelectValue placeholder={`Select a subject`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        {generateSelectItems(tagSchema.subject)}
      </SelectContent>
    </Select>
  )
}

export default SubjectSelect

SubjectSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
}

SubjectSelect.defaultProps = {
  className: '',
  field: null,
}
