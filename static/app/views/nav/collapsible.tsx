import styled from '@emotion/styled';
import {AnimatePresence, motion} from 'framer-motion';

import testableTransition from 'sentry/utils/testableTransition';

export function Collapsible({
  children,
  collapsed,
  disabled = false,
}: {
  children: React.ReactNode;
  collapsed: boolean;
  disabled?: boolean;
}) {
  if (disabled) {
    return children;
  }
  const visualDuration = 0.4;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!collapsed && (
        <CollapsableWrapper
          key="collapsible-content"
          variants={{
            collapsed: {
              height: 0,
              overflow: 'hidden',
            },
            expanded: {
              // overflow: 'visible',
              height: 'auto',
            },
          }}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          transition={testableTransition({
            type: 'spring',
            damping: 50,
            stiffness: 600,
            bounce: 0,
            visualDuration,
          })}
        >
          {/*
            We need to wrap the children in a div to prevent the parent's flex-direction: column-reverse
            from applying to the children, which may cause the children's order to be reversed
          */}
          <div>{children}</div>
        </CollapsableWrapper>
      )}
    </AnimatePresence>
  );
}

const CollapsableWrapper = <Flex direction="column-reverse">{children}</Flex>;
