import * as React from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';

const colorMap = {
  info: '#abcdef',
  warning: '#00ffff',
  danger: '#ff0000',
  fine: '#00ff00',
};

type StatusType = 'info' | 'warning' | 'danger' | 'fine';

export interface StatusProps {
  label: string;
  status?: StatusType;
  additionalInfo?: string;
  className?: string;
}

export const Status = styled(({ label, additionalInfo }: StatusProps) => (
  <div>
    <StatusContent label={label} additionalInfo={additionalInfo} />
  </div>
))<StatusProps>(
  ({ status = 'info' }) =>
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 250px 250px 0 0;
      border-color: ${colorMap[status]} transparent transparent transparent;
    `,
);

interface StatusContentProps {
  label: string;
  additionalInfo: string | undefined;
}

const StatusContent = styled(
  ({ label, additionalInfo }: StatusContentProps) => (
    <div>
      <span>{label}</span>
      {!!additionalInfo && <p>Click for more Info</p>}
    </div>
  ),
)<StatusContentProps>(
  () =>
    css`
      transform: rotate(-45deg);
      text-align: center;
      color: #ffffff;

      span {
        font-size: 20px;
        font-weight: bold;
        text-transform: uppercase;
      }

      p {
        font-size: 16px;
      }
    `,
);
