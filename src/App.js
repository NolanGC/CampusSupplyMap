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
import {  extendTheme, ChakraProvider, Stack, Switch, Button, Alert, Image, Grid, GridItem, Text, FormControl, FormLabel, Flex, Box, SimpleGrid } from '@chakra-ui/react'

import db from './firebase';
import { getDatabase, ref, onValue} from "firebase/database";


export default function Example() {

  const [rooms, setRooms] = useState([[]]);
  const [stocked, setStocked] = useState([[]]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);
  const [mode, setMode] = useState("Tampons") // true = periodcare, false = clothes

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
      if(room[mode] === 1){
        let copy = area;
        if(mode === "Sweatpants" || mode === "Hairties" || mode === "Underwear"){
          copy["style"] = { background: 'rgba(191, 85, 236, 0.4)' };
        }
        else{
          copy["style"] = { background: 'rgba(255, 53, 184, 0.4)' };
        }
        final.push(copy)
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

  return <Box>
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

        <Flex bg='red' maxW="56%">
          <Image flex={2} src={bottomBanner} />
          <RequestButton flex={1}/>
        </Flex>

        <InfoButton/>
      </Stack>
        <Grid position='absolute' left='13%' top='70%' templateColumns='repeat(3, 1fr)' columns={3} gap={0}>
          <GridItem >
            <Button fontSize='12' onClick={()=>setMode('Tampons')} maxHeight='80%'colorScheme='pink'>Tampons</Button>
          </GridItem>
          <GridItem>
            <Button fontSize='12' onClick={()=>setMode('Pads')} minW='90' maxHeight='80%'colorScheme='pink'>Pads</Button>
          </GridItem>
          <GridItem>
            <Button fontSize='12' onClick={()=>setMode('Liners')} minW='90' maxHeight='80%'colorScheme='pink'>Liners</Button>
          </GridItem>
          <GridItem>
            <Button fontSize='12' onClick={()=>setMode('Hairties')} maxHeight='80%'colorScheme='purple'>Hairties</Button>
          </GridItem>
          <GridItem>
            <Button fontSize='12' onClick={()=>setMode('Underwear')} maxHeight='80%'colorScheme='purple'>Underwear</Button>
          </GridItem>
          <GridItem>
            <Button fontSize='12' onClick={()=>setMode('Sweatpants')} maxHeight='80%'colorScheme='purple'>Sweatpants</Button>
          </GridItem>
        </Grid>

  </Box>;
}
