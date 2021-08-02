import React from 'react'
import { Box, Select, Stack, Button, Spacer, Text, VStack } from "@chakra-ui/react"

const Topic = ({ state }) => {
    if (state.currentData) {
        var { currentClass, currentSubject, currentChapters } = state.currentData;

    }
    let chapterId = Number(window.location.pathname.split("/")[2])
    let selectedChapter;
    currentChapters.map(chapter => {
        if (chapter['id'] == chapterId) {
            selectedChapter = chapter
        }
    })

    return (
        <div>
            <Box borderWidth="2px" borderColor="black" p="20px" m="10px">
                <VStack align="flex-start" >
                    {selectedChapter ? <>

                        <Text fontSize="3xl" justify="center" p="5px">Chapter Details </Text>
                        <Text fontSize="2xl" align="right" p="5px">Subject : {currentSubject} </Text>
                        <Text fontSize="2xl" align="right" p="5px">Class : {currentClass} </Text>
                        <Text fontSize="2xl" align="right" p="5px">Chapter : {selectedChapter['name']} </Text>

                        <Box bg="white" borderWidth="2px" my='30px' px='10px' py='5px' mx="20px" width="100%" borderColor="black" >

                            <Text fontSize="20px" p="5px">Author : </Text>
                            <Text fontSize="20px" p="5px">Book Questions : </Text>
                            <Text fontSize="20px" p="5px">Exam Questions (Last 5 year) : </Text>

                        </Box>
                    </> : null}

                </VStack>
            </Box>

        </div>
    )
}

export default Topic
