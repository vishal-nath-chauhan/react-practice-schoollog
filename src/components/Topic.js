import React from 'react'
import { Box, Select, Stack, Button, Spacer, Text, VStack } from "@chakra-ui/react"

const Topic = ({ state }) => {
    if (state.currentData) {
        var { currentClass, currentSubject, currentChapters } = state.currentData;


    }
    return (
        <div>
            <Box borderWidth="2px" borderColor="black" p="20px" m="10px">
                <VStack align="flex-start" >
                    <Text fontSize="3xl" justify="center" p="5px">Chapter Details </Text>
                    <Text fontSize="2xl" align="right" p="5px">Chapter : {currentSubject} </Text>
                    <Box bg="white" borderWidth="2px" my='30px' px='10px' py='5px' mx="20px" width="100%" borderColor="black" >

                        <Text fontSize="20px" p="5px">Author : </Text>
                        <Text fontSize="20px" p="5px">Book Questions : </Text>
                        <Text fontSize="20px" p="5px">Exam Questions (Last 5 year) : </Text>

                    </Box>
                </VStack>
            </Box>

        </div>
    )
}

export default Topic
