import { InfoIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Link
  } from '@chakra-ui/react'



export default function InfoButton () {
    return (
        <Center>
            <Link href='https://firebasestorage.googleapis.com/v0/b/campussupply-ba45c.appspot.com/o/PeriodResources.pdf?alt=media&token=0cf6c9d2-61cd-4db9-a07f-00ff7f56dd2d'>
            <Button leftIcon={<InfoIcon />} rightIcon={<InfoIcon />} width={2000} colorScheme='pink' variant='solid'>
           Learn All About Periods
            </Button>
        </Link>
        </Center>
    )
}
