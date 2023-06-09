import React from "react";
import { Marker, MarkerProps } from "@react-google-maps/api";
import { isEqual } from "lodash";
import { useMaker } from "../../../commons/hooks/custom/useMaker";
// import MapOverlayView from "../MapOverlayView";
import { IAutocompleteShopsOutput } from "../../../../commons/types/generated/types";
import { useRecoilValue } from "recoil";
import { mapState } from "../../../../commons/Store";
import { MapInfoWindow } from "../MapInfoWindow";

interface IMarkerProps extends MarkerProps {
  shop: IAutocompleteShopsOutput;
}

const MapMarker = (props: IMarkerProps) => {
  const { onClickMaker, markerRef } = useMaker(props.shop);
  const mapInfo = useRecoilValue(mapState);
  const isClicked = isEqual(mapInfo?.shop?.id, props.shop?.id);
  console.log(markerRef);
  return (
    <Marker
      ref={markerRef}
      position={props.position}
      zIndex={1000}
      title={props.shop?.name}
      icon={{
        url: "/image/icon-marker.svg",
        scaledSize: new google.maps.Size(64, 64),
      }}
      onClick={onClickMaker}
      animation={isClicked ? 1 : undefined}
    >
      {markerRef.current !== null ? (
        <MapInfoWindow
          shop={props.shop}
          isClicked={isClicked}
          marker={markerRef}
        />
      ) : (
        <></>
      )}
    </Marker>
  );
};

export default MapMarker;
