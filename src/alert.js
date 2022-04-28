import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { ArrowDownIcon } from '@chakra-ui/icons'

export default function ChakraAlert (props) {
    if(props.display){
        return (
            <Alert
  status='success'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='160px'
  colorScheme='pink'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    {props.title}
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
   {props.message}
  </AlertDescription>
</Alert>
        )
    }
    else{
      return (
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='160px'
          colorScheme='pink'
          >
          <ArrowDownIcon boxSize='60px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
          Rooms highlighted pink are in stock! Tap for info!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
          {props.message}
          </AlertDescription>
        </Alert>
      )
    }
    
}