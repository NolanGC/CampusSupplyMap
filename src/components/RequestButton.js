import { RepeatIcon } from "@chakra-ui/icons";
import {
    Button,
    Box,
    Link
  } from '@chakra-ui/react'



export default function RequestButton ({flex}) {
    return (
        <Box flex={flex} >
            <Link href='https://www.google.com'>
            <Button w="100%" height="100%" leftIcon={<RepeatIcon />} rightIcon={<RepeatIcon />} colorScheme='pink' variant='ghost'>
              Request Refill
            </Button>
        </Link>
        </Box>
    )
}
