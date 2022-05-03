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
import { collection , onSnapshot } from 'firebase/firestore';
import {  extendTheme, ChakraProvider, Stack } from '@chakra-ui/react'
import {
  Alert,
  Image
} from '@chakra-ui/react'

export default function Example() {

  const [rooms, setRooms] = useState([[]]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);
  console.log(rooms);
  
  useEffect(() => {
    onSnapshot(collection(db,'rooms'),(snapshot)=>{
      setRooms(snapshot.docs.map(doc=>doc.data()));
      
      })
  },[display]);

  const ImageMapComponent = React.useMemo(
    () => (
      <body>
      <meta name="viewport"></meta>
      <ChakraProvider>
          <Stack spacing={0}>
          <Image src={banner} alt="banner" width="100%" height="100%" />
          <ChakraAlert message={message} title={title} display={display}></ChakraAlert>
          <ImageMap
              className="usage-map"
              src={map}
              map={mapArea.filter((element, index) => JSON.stringify(rooms[0]).includes(""+roomMap[index+1]))}
              onMapClick={(index) => {
                setDisplay(true)
                setMessage(rooms[0][roomMap[mapArea.indexOf(index)+1]])
                setTitle("Room " + roomMap[mapArea.indexOf(index)+1] + " is in stock!")
              }}
            />
            <Image src={bannerb} alt="banner" width="100%" height="100%" />
            <InfoButton ></InfoButton>
          </Stack>
      </ChakraProvider>
      </body>
    ),
    [rooms, message]
  );
  return <div>{ImageMapComponent}</div>;
}
