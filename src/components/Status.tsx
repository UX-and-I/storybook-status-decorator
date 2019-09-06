import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const colorMap = {
  info: '#33b5e5',
  warning: '#ffbb33',
  danger: '#ff4444',
  fine: '#00c851',
};

type StatusType = 'info' | 'warning' | 'danger' | 'fine';
type InfoType = { shortInfo: string; fullInfo?: string };

export interface StatusProps {
  label: string;
  statusType?: StatusType;
  additionalInfo?: InfoType;
  className?: string;
  [htmlAttributes: string]: any;
}

export interface StatusState {
  detailsVisible?: boolean;
}

class MStatus extends React.Component<StatusProps, StatusState> {
  constructor(props: StatusProps) {
    super(props);

    this.state = { detailsVisible: false };

    this.toggleDetailsVisibility = this.toggleDetailsVisibility.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }

  toggleDetailsVisibility() {
    let { detailsVisible } = this.state;
    detailsVisible = !detailsVisible;
    this.setState({ detailsVisible });
  }

  closeDetails() {
    this.setState({ detailsVisible: false });
  }

  render() {
    const {
      label,
      statusType = 'info',
      additionalInfo,
      className,
      ...htmlAttributes
    } = this.props;
    const { detailsVisible } = this.state;

    return (
      <>
        <div
          className={className}
          onClick={() => this.toggleDetailsVisibility()}
          {...htmlAttributes}
        >
          <StatusContent label={label} additionalInfo={!!additionalInfo} />
        </div>
        {!!additionalInfo && (
          <StatusInfoBox
            label={label}
            statusType={statusType}
            additionalInfo={additionalInfo}
            className={detailsVisible ? 'isVisible' : ''}
            onClick={() => this.closeDetails()}
          />
        )}
      </>
    );
  }
}

export const Status = styled(MStatus)<StatusProps>(
  ({ statusType = 'info', additionalInfo }) =>
    css`
      position: fixed;
      z-index: 999;
      top: -25px;
      left: -95px;
      transform: rotate(-45deg);
      width: 280px;
      height: 140px;
      background-color: ${colorMap[statusType]};
      box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.2);
      ${!!additionalInfo ? `cursor: pointer;` : ''}
    `,
);

interface StatusContentProps {
  label: string;
  additionalInfo: boolean;
  [htmlAttributes: string]: any;
}

const StatusContent = styled(
  ({ label, additionalInfo, ...htmlAttributes }: StatusContentProps) => (
    <div {...htmlAttributes}>
      <span>{label}</span>
      {additionalInfo && <p>(Click for more Info)</p>}
    </div>
  ),
)<StatusContentProps>(
  () =>
    css`
      margin-top: 86px;
      text-align: center;
      color: #ffffff;
      font-family: sans-serif;

      span {
        font-size: 22px;
        line-height: 28px;
        font-weight: bold;
        text-transform: uppercase;
      }

      p {
        font-size: 16px;
      }
    `,
);

interface StatusInfoBoxProps {
  label: string;
  additionalInfo: InfoType;
  statusType: StatusType;
  [htmlAttributes: string]: any;
}

const StatusInfoBox = styled(
  ({
    label,
    additionalInfo,
    statusType,
    closeDetails,
    ...htmlAttributes
  }: StatusInfoBoxProps) => (
    <div {...htmlAttributes}>
      <h3>
        {label}
        <span onClick={closeDetails}>X</span>
      </h3>
      <p>
        <em>{additionalInfo.shortInfo}</em>
      </p>
      {!!additionalInfo.fullInfo && <p>{additionalInfo.fullInfo}</p>}
    </div>
  ),
)<StatusInfoBoxProps>(
  ({ statusType }) =>
    css`
      display: none;
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.2);
      padding: 16px;
      background: ${colorMap[statusType]};

      & h3 {
        display: block;
        position: relative;
        padding-right: 96px;
        font-size: 22px;
        line-height: 48px;
        color: white;
        font-family: sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        text-align: left;

        & span {
          position: absolute;
          z-index: 1;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }

      & p {
        display: block;
        padding: 24px;
        background-color: white;
        color: black;
        font-size: 18px;
      }

      &.isVisible {
        display: block;
      }
    `,
);
