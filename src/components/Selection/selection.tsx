import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import React from 'react';
import './styles.css';
import { basesType } from '../../App';


interface SelectionProps {
  base: basesType;
  setBase: (base: basesType) => void;
  otherBase: basesType;
}

export function Selection({ base, otherBase, setBase }: SelectionProps) {
  const bases = ['Decimal', 'Binário', 'Octal', 'Hexadecimal'];

  const handleSetBase = (base: string) => {
    if (base !== otherBase) setBase(base as 'Decimal' | 'Binário' | 'Octal' | 'Hexadecimal');
  }

  return (
    <Select.Root value={base} onValueChange={handleSetBase}>
      <Select.Trigger className="SelectTrigger">
        <Select.Value placeholder="Select" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="SelectContent" position="popper">
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              {bases.map((base) => (
                <>
                  {(otherBase !== 'Decimal' && base !== 'Decimal') || (otherBase === base)
                    ? (
                      <SelectItem key={base} value={base} disabled>
                        {base}
                      </SelectItem>
                    ) : (
                      <SelectItem key={base} value={base}>
                        {base}
                      </SelectItem>
                    )}
                </>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = React.forwardRef(({ children, ...props }: any, forwardedRef) => {
  return (
    <Select.Item className="SelectItem" {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});