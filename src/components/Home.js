import React, { useState } from 'react'
import { Box, Select, Stack, Button, Spacer, Text } from "@chakra-ui/react"
import Add from './Add';
import { useSelector } from 'react-redux';
import ListChapters from './ListChapters';
const Home = () => {
    const [currentClass, setCurrentClass] = useState();
    const [currentSubject, setCurrentSubject] = useState();
    const [isAddingNew, setisAddingNew] = useState(false)
    const courseData = useSelector((state) => state.courseData)
    const handleClass = (e) => {
        setCurrentClass(e.target.value)
        setCurrentSubject(undefined)

    }
    const handleSubject = (e) => {
        setCurrentSubject(e.target.value);
    }

    return (
        <div>
            <Box bg="white" borderWidth="10px" shadow='sm' mb='10px' px='10px' py='5px' color="black" m="20px"  >

                <Text fontSize="3xl" textAlign="center" p="5px">Subject Management </Text>

                <Stack direction="row" p="20px" m="10px" >
                    <Select w="30%" placeholder="Select standard " onChange={(e) => {
                        handleClass(e)
                    }}>
                        {
                            courseData.map(elm =>
                                <option value={elm['Standard']} key={elm['Standard']} >{elm['Standard']}</option>
                            )
                        }
                    </Select>
                    <Select w="30%" placeholder="Select Subject" onChange={(e) => { handleSubject(e); }} >
                        {currentClass ?
                            courseData.find(element => element['Standard'] == currentClass)['subjects'].map((subject) =>
                                <option value={subject['subjectName']} key={subject['subjectName']} >{subject['subjectName']}</option>

                            ) : null}
                    </Select>
                    <Spacer />
                    <Button size="ms" w="10%" colorScheme="green" onClick={() => setisAddingNew(true)}>Add Chapter</Button>
                    {isAddingNew && currentSubject !== undefined && currentClass !== undefined ? <Add setisAddingNew={setisAddingNew} />
                        : null}
                </Stack>
                {currentSubject ?
                    <Text fontSize="2xl" px="20px" m="5px">Subject : {currentSubject} </Text> :
                    null
                }
                {currentSubject !== undefined && currentClass !== undefined ? <ListChapters currentSubject={currentSubject} currentClass={currentClass} /> : null}

            </Box>
        </div>
    )
}

export default Home
