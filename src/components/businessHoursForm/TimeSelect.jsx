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
import { cn } from '@/lib/utils'

const generateSelectItems = (from, to) => {
  const items = []
  for (let i = from; i <= to; i++) {
    let hour = i < 10 ? '0' + i : i.toString()
    let min
    for (let j = 0; j < 2; j++) {
      min = j === 0 ? '00' : '30'
      const value = [hour, min, '00'].join(':')
      const displayValue = [hour, min].join(':')
      items.push(<SelectItem value={value} children={displayValue} key={`${i}-${j}`} />)
    }
  }
  return items
}

const TimeSelect = (props) => {
  return (
    <Select className={cn(props.className)}
            value={props.field.value}
            defaultValue={props.field.value}
            onValueChange={props.field.onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select a ${props.isClosingTime ? 'closing' : 'opening'} time`} />
      </SelectTrigger>
      <SelectContent className={'overflow-y-auto max-h-[15rem]'}>
        <SelectGroup>
          <SelectLabel>AM</SelectLabel>
          {generateSelectItems(0, 11)}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>PM</SelectLabel>
          {generateSelectItems(12, 23)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TimeSelect

TimeSelect.propTypes = {
  className: PropTypes.string,
  isClosingTime: PropTypes.bool,
  field: PropTypes.object,
}

TimeSelect.defaultProps = {
  className: '',
  isClosingTime: false,
  field: null,
}