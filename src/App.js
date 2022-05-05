import React, { useEffect, useState } from "react";
import "./styles.css";

import mapArea from './data/mapArea.json';
import roomMap from './data/roomNumberMap.json'

import map from './images/map.png'
import topBanner from './images/banner.png';
import bottomBanner from './images/bannerb.png';


import { ImageMap } from "@qiuz/react-image-map";
import CustomAlert from './components/alert.js';
import RequestButton from './components/RequestButton'
import InfoButton from "./components/InfoButton";
import {  extendTheme, ChakraProvider, Stack, Switch, Alert, Image, Text, FormControl, FormLabel, Flex } from '@chakra-ui/react'

import db from './firebase';
import { getDatabase, ref, onValue} from "firebase/database";


export default function Example() {

  const [rooms, setRooms] = useState([[]]);
  const [stocked, setStocked] = useState([[]]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);
  const [mode, setMode] = useState(true) // true = periodcare, false = clothes

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
    let final = []
    for(const area of valid){
      let num = getNumber(area)
      let room = getRoom(num)
      // looking for period care
      if(mode){
        if(room['Tampons'] === 1 || room['Pads'] === 1 || room['Liners'] === 1){
          let copy = area;
          copy["style"] = { background: 'rgba(255, 53, 184, 0.4)' };
          final.push(copy)
        }
      }
      // looking for extra clothes
      else{
        if(room['Hairties'] === 1 || room['Underwear'] === 1 || room['Sweatpants'] === 1){
          let copy = area;
          copy["style"] = { background: 'rgba(191, 85, 236, 0.4)' };
          final.push(copy)
        }
      }
    }
    return final
  }
  function getNumber(element) {
    return roomMap[mapArea.indexOf(element)+1]
  }
  function getRoom(roomNumber){
    for(const room of rooms){
      if(room['Room'] === roomNumber){
        return room;
      }
    }
  }
  function getMessage(element){
    let message = "We have: "
    let roomNumber = getNumber(element)
    let room = getRoom(roomNumber)
    for(const item of Object.keys(room)){
      if(item === 'Id' || item === 'Room') continue;
      if(room[item] === 1){
        message += item + ', '
      }
    }
    return message.substring(0, message.length-2)
  }
  function toggleMode(){
    setMode(!mode)
  }

  return <div>
      <Stack spacing={0}>
      <Image src={topBanner} alt="banner" width="100%" height="100%" />
      <CustomAlert message={message} title={title} display={display}></CustomAlert>
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

        <Flex bg='red' maxW="100%">
          <Image flex={4} w="80%" src={bottomBanner} />
          <RequestButton flex={2}/>
        </Flex>

        <InfoButton/>
      </Stack>

      <FormControl top="72%" left="17%" position="absolute" display='flex' alignItems='center'>
        <FormLabel  mb='0'>
          Extra Clothes
        </FormLabel>
        <Switch colorScheme='pink' defaultIsChecked="true" onChange={toggleMode} ></Switch>
        <FormLabel  mb='0' ml="3">
          Period Care
        </FormLabel>
      </FormControl>

  </div>;
}
