import styled from '@emotion/styled';

import {space} from 'sentry/styles/space';

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  padding?: string;
  ref?: React.Ref<HTMLLIElement>;
  symbol?: React.ReactElement;
}

const ListItem = styled(
  ({ref, symbol, children, padding: _padding, ...props}: ListItemProps) => (
    <li ref={ref} role={props.onClick ? 'button' : undefined} {...props}>
      {symbol && <Symbol>{symbol}</Symbol>}
      {children}
    </li>
  )
)`
  position: relative;
  ${p => p.symbol && `padding-left: ${p.padding ?? space(4)};`}
`;

const Symbol = <Flex align="center">{children}</Flex>;

export default ListItem;
