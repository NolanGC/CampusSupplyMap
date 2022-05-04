import React, { useEffect, useState } from "react";
import "./styles.css";
import mapArea from './mapArea.json';
import map from './map.png'
import roomMap from './roomNumberMap.json'
import { ImageMap } from "@qiuz/react-image-map";
import db from './firebase';
import ChakraAlert from './alert.js';
import banner from './banner.png';
import bannerb from './bannerb.png';
import InfoButton from "./InfoButton";
import 'firebase/compat/firestore';
import { collection , onSnapshot, doc } from 'firebase/firestore';
import {  extendTheme, ChakraProvider, Stack } from '@chakra-ui/react'
import {
  Alert,
  Image
} from '@chakra-ui/react'
import { getDatabase, ref, onValue} from "firebase/database";


export default function Example() {

  const [rooms, setRooms] = useState([[]]);
  const [stocked, setStocked] = useState([[]]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);



  useEffect(() => {
    const supplyRef = ref(db, '1YubLsEO-7GnMMzGAD8BG8bpd1jB25N35-w_PxSO-aMs/Sheet1');
    onValue(supplyRef, (snapshot) => {
      let stockedArray = [];
      let dataArray = [];
      const data = snapshot.val();
      data.shift();
      for(const entry of data){
        stockedArray.push(entry['Room'])
      }
      setRooms(data)
      setStocked(stockedArray)
    });
  },[display]);
  function getMapAreas(){
    let allAreas = mapArea;
    let valid = allAreas.filter((element, index) => stocked.includes(roomMap[index+1]))
    return valid
  }
  function getNumber(element) {
    return roomMap[mapArea.indexOf(element)+1]
  }
  function getMessage(element){
    let message = ""
    let roomNumber = getNumber(element)
    for(const room of rooms){
      if(room['Room'] == roomNumber){
        message += room['Pads']
      }
    }
    return message
  }

  const ImageMapComponent = React.useMemo(
    () => (
      <div>
          <Stack spacing={0}>
          <Image src={banner} alt="banner" width="100%" height="100%" />
          <ChakraAlert message={message} title={title} display={display}></ChakraAlert>
          <ImageMap
              className="usage-map"
              src={map}
              map={getMapAreas()}
              onMapClick={(element, index) => {
                setDisplay(true)
                setMessage(getMessage(element))
                setTitle("Room " + getNumber(element) + " is in stock!")
              }}
            />
            <Image src={bannerb} alt="banner" width="100%" height="100%" />
            <InfoButton ></InfoButton>
          </Stack>
      </div>
    ),
    [rooms, message]
  );
  return <div>{ImageMapComponent}</div>;
}
