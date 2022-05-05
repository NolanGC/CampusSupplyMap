import { RepeatIcon } from "@chakra-ui/icons";
import {
    Button,
    Box,
    Link
  } from '@chakra-ui/react'



export default function RequestButton ({flex}) {
    return (
        <Box flex={flex} >
            <Link href='https://docs.google.com/forms/u/1/d/e/1FAIpQLSfSwpCjeJhotYdj7iY5UhGzIg6AP1upHhD91A7RJo7zxfNflQ/viewform?usp=sf_link&urp=gmail_link'>
            <Button w="100%" height="100%" leftIcon={<RepeatIcon />} rightIcon={<RepeatIcon />} colorScheme='pink' variant='ghost'>
              Request Refill
            </Button>
        </Link>
        </Box>
    )
}
