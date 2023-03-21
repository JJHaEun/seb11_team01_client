import styled from "@emotion/styled";
import * as GS from "../../../../../theme/global";

interface IBackgroundWrapperProps {
  centered?: boolean;
  viewport?: boolean;
}

export const BackgroundWrapper = styled.div<IBackgroundWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${GS.base.primary};
  width: 100%;
  padding: 0px 64px 150px 64px;
`;
