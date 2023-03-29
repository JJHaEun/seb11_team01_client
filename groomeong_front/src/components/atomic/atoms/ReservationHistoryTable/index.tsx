/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservation } from "../../../../commons/types/generated/types";
import { getDate } from "../../../commons/libraries/GetDate";
import { isSameDate } from "../../../commons/libraries/GetTimeStamp";
import { UseQueryFetchReservationByUser } from "../../../commons/hooks/query/UseQueryFetchReservationByUserId";
import { Buttons } from "../Buttons";
import { MouseEvent, useState } from "react";
import { ReviewModal } from "../../organisms/ReviewModal";
import { UseQueryFetchShopWithReviewAuth } from "../../../commons/hooks/query/UseQueryFetchShopWithReviewAuth";

export const ReservationHistoryTable = (): JSX.Element => {
  const [shopId, setShopId] = useState("");
  const { data } = UseQueryFetchReservationByUser();
  const { data: reviewData } = UseQueryFetchShopWithReviewAuth(shopId);
  const [reservationId, setReservationId] = useState("");
  const [onReview, setOnReview] = useState(false);

  const onClickReview = (event: MouseEvent<HTMLButtonElement>): void => {
    setOnReview(true);
    setShopId(event.currentTarget.className.split(" ")[0]);
    setReservationId(event.currentTarget.id);
  };

  const onClickCancel = (): void => {
    setOnReview(false);
  };

  return (
    <>
      {data !== null ? (
        data?.fetchReservationsByUser.map((el: IReservation) => (
          <>
            {!isSameDate(el.date) ? (
              <></>
            ) : (
              <tbody key={el.id}>
                <tr>
                  <th>{el.shop.name}</th>
                  <th>{getDate(el.date)}</th>
                  <th>{el.time}</th>
                  <th>{el.dog.name}</th>
                  <th>
                    <div>
                      {el.review != null ? (
                        <div>리뷰 작성 완료</div>
                      ) : (
                        <Buttons
                          variation="primary"
                          label="리뷰 쓰기"
                          border="none"
                          size="small"
                          type="button"
                          onClick={onClickReview}
                          id={el.id}
                          className={el.shop.id}
                        ></Buttons>
                      )}

                      {onReview ? (
                        <ReviewModal
                          reservationId={reservationId}
                          shopId={shopId}
                          showModal={onClickCancel}
                        ></ReviewModal>
                      ) : (
                        <></>
                      )}
                    </div>
                  </th>
                </tr>
              </tbody>
            )}
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
};
