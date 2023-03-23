import * as S from "./index.style";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Buttons } from "../../Buttons";
import { useMoveToPage } from "../../../../commons/hooks/custom/useMovedToPage";
import { useLogout } from "../../../../commons/hooks/custom/useLogout";

interface ITopBarMapProps {
  loggedIn: boolean;
}

export const TopBarMap = (props: ITopBarMapProps) => {
  const { onClickLogOut } = useLogout();

  const { onClickMoveToPage } = useMoveToPage();

  return (
    <>
      <S.TopBarBox>
        <S.TopBarLogo onClick={onClickMoveToPage("/home")}>
          <img src="/image/img_logo_raw_black.png" alt="" />
        </S.TopBarLogo>
        <S.TopBarButtons loggedIn={props.loggedIn}>
          {props.loggedIn ? (
            <>
              <Buttons
                iconImg={<EventAvailableIcon />}
                label="예약일정"
                variation="tertiary"
                size="small"
                border="none"
              ></Buttons>
              <Buttons
                size="small"
                label="로그아웃"
                variation="tertiary"
                border="none"
                onClick={onClickLogOut}
              ></Buttons>
              <S.TopBarProfile>
                <img src={"image/icon_dog_profile.png"} alt="" />
              </S.TopBarProfile>
            </>
          ) : (
            <>
              <Buttons
                size="small"
                label="로그인"
                variation="tertiary"
                border="none"
                onClick={onClickMoveToPage("/login")}
              ></Buttons>
              <Buttons
                size="small"
                label="회원가입"
                variation="tertiary"
                border="none"
                onClick={onClickMoveToPage("/signup")}
              ></Buttons>
            </>
          )}
        </S.TopBarButtons>
      </S.TopBarBox>
    </>
  );
};
