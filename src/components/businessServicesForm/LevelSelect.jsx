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

const LevelSelect = (props) => {
  return (
    <Select
      className={cn(props.className)}
      value={props.field.value}
      defaultValue={props.field.value}
      onValueChange={props.field.onChange}
    >
      <SelectTrigger className={'w-full'}>
        <SelectValue placeholder={`Select a level`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        <SelectGroup>
          <SelectLabel>Primary</SelectLabel>
          {generateSelectItems(tagSchema.level.primary)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Secondary</SelectLabel>
          {generateSelectItems(tagSchema.level.secondary)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>JC</SelectLabel>
          {generateSelectItems(tagSchema.level.jc)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LevelSelect

LevelSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
}

LevelSelect.defaultProps = {
  className: '',
  field: null,
}
