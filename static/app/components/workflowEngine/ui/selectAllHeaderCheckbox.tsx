import styled from '@emotion/styled';

import {Checkbox} from 'sentry/components/core/checkbox';
import {t} from 'sentry/locale';

type SelectAllHeaderCheckboxProps = {
  checked: boolean | 'indeterminate';
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export function SelectAllHeaderCheckbox({
  checked,
  onChange,
  disabled,
  className,
}: SelectAllHeaderCheckboxProps) {
  return (
    <Wrapper
      className={className}
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={event => onChange(event.target.checked)}
        aria-label={t('Select all on page')}
      />
    </Wrapper>
  );
}

const Wrapper = <Flex align="center">{children}</Flex>;
