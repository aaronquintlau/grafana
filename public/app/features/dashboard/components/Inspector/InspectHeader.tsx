import React, { FC } from 'react';
import { css } from 'emotion';
import { Icon, stylesFactory, Tab, TabsBar, useTheme } from '@grafana/ui';
import { GrafanaTheme, SelectableValue } from '@grafana/data';
import { InspectTab } from './PanelInspector';
import { PanelModel } from '../../state';

interface Props {
  tab: InspectTab;
  tabs: Array<{ label: string; value: InspectTab }>;
  stats: { requestTime: number; queries: number; dataSources: number };
  panel: PanelModel;
  isExpanded: boolean;

  onSelectTab: (tab: SelectableValue<InspectTab>) => void;
  onClose: () => void;
  onToggleExpand: () => void;
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    header: css`
      background-color: ${theme.colors.formInputBg};
      z-index: 1;
      flex-grow: 0;
      padding: ${theme.spacing.sm} ${theme.spacing.sm} 0 ${theme.spacing.lg};
    `,
    actions: css`
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: ${theme.spacing.md};
      font-size: ${theme.typography.size.lg};
    `,
    expand: css`
      cursor: pointer;
    `,
    close: css`
      cursor: pointer;
      width: 25px;
      height: 100%;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
    `,
    titleWrapper: css`
      margin-bottom: ${theme.spacing.lg};
    `,
  };
});

export const InspectHeader: FC<Props> = ({
  tab,
  tabs,
  onSelectTab,
  onClose,
  onToggleExpand,
  panel,
  stats,
  isExpanded,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const statsString = `${stats.queries} ${stats.queries === 1 ? 'query' : 'queries'} - ${stats.dataSources} ${
    stats.dataSources === 1 ? 'data source' : 'data sources'
  } - ${stats.requestTime === -1 ? 'N/A' : stats.requestTime}ms`;

  return (
    <div className={styles.header}>
      <div className={styles.actions}>
        <div className={styles.expand} onClick={onToggleExpand}>
          <Icon name={isExpanded ? 'chevron-right' : 'chevron-left'} />
        </div>
        <div className={styles.close} onClick={onClose}>
          <i className="fa fa-close" />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <h3>{panel.title}</h3>
        <div>{statsString}</div>
      </div>
      <TabsBar>
        {tabs.map((t, index) => {
          return (
            <Tab
              key={`${t.value}-${index}`}
              label={t.label}
              active={t.value === tab}
              onChangeTab={() => onSelectTab(t)}
            />
          );
        })}
      </TabsBar>
    </div>
  );
};
