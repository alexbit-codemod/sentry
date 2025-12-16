import {isValidElement} from 'react';
import styled from '@emotion/styled';

import {Flex} from '@sentry/scraps/layout';

import * as Layout from 'sentry/components/layouts/thirds';
import {space} from 'sentry/styles/space';
import type {RouteComponentProps} from 'sentry/types/legacyReactRouter';

import SettingsBreadcrumb from './settingsBreadcrumb';
import SettingsHeader from './settingsHeader';
import SettingsSearch from './settingsSearch';

type Props = {children: React.ReactNode} & RouteComponentProps;

function SettingsLayout(props: Props) {
  const {children, params, routes} = props;

  // We want child's view's props
  const childProps =
    children && isValidElement(children) ? (children.props as Props) : props;
  const childRoutes = childProps.routes || routes || [];

  return (
    <SettingsColumn>
      <SettingsHeader>
        <Flex align="center" justify="between">
          <StyledSettingsBreadcrumb params={params} routes={childRoutes} />
          <SettingsSearch />
        </Flex>
      </SettingsHeader>

      <MaxWidthContainer>
        <Content>{children}</Content>
      </MaxWidthContainer>
    </SettingsColumn>
  );
}

const SettingsColumn = <Flex direction="column">{children}</Flex>;

const StyledSettingsBreadcrumb = styled(SettingsBreadcrumb)`
  flex: 1;
`;

const MaxWidthContainer = styled('div')`
  display: flex;
  /* @TODO(jonasbadalic) 1440px used to be defined as theme.settings.containerWidth and only used here */
  max-width: 1440px;
  flex: 1;
`;

/**
 * Note: `overflow: hidden` will cause some buttons in `SettingsPageHeader` to be cut off because it has negative margin.
 * Will also cut off tooltips.
 */
const Content = styled('div')`
  flex: 1;
  padding: ${space(4)};
  min-width: 0; /* keep children from stretching container */

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    padding: ${space(2)};
  }

  /**
   * Layout.Page is not normally used in settings but <PermissionDenied /> uses
   * it under the hood. This prevents double padding.
   */
  ${Layout.Page} {
    padding: 0;
  }
`;

export default SettingsLayout;
