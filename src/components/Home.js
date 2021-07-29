import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import {
    Box, FormControl,
    Input, Select, Stack, Button, IconButton
} from "@chakra-ui/react"
import Add from './Add'
const Home = () => {
    let data = require("../Data/Data.json")

    const [currentClass, setCurrentClass] = useState();
    const [currentSubject, setCurrentSubject] = useState();
    const [currentChapters, setCurrentChapters] = useState()
    const [courseData, setCourseData] = useState(data)
    const [isEditing, setIsEditing] = useState({ id: null, status: false })
    const [newChapterName, setnewChapterName] = useState('')
    const [isAddingNew, setisAddingNew] = useState(false)
    const handleChapter = () => {
        setisAddingNew(false)
        setIsEditing({ id: null, status: false })
        courseData.map((dt) => {
            if (dt['Standard'] == currentClass) {

                dt['subjects'].map((sub) => {
                    if (sub['subjectName'] == currentSubject) {
                        setCurrentChapters(sub['Chapters'])
                    }
                })
            }
        })
    }
    const handleDelete = (idx) => {
            setisAddingNew(false)
        setIsEditing({ id: null, status: false })
        setCurrentChapters(currentChapters.filter((element) => element['id'] !== idx))
        courseData.map((element) => {
            if (element['Standard'] == currentClass) {
                element['subjects'].map((sub) => {
                    if (sub['subjectName'] == currentSubject) {
                        sub['Chapters'] = currentChapters.filter((element) => element['id'] !== idx)
                    }
                })
            }
        })
        setCourseData(courseData)
    }

    const handleSubjects = (e) => {
        setCurrentSubject(e.target.value)


    }

    const handleEdit = (idx) => {
        setIsEditing(false)
        currentChapters.map((chapter) => {
            if (chapter['id'] == idx) {
                chapter['name'] = newChapterName
            }
        })
        courseData.map((element) => {
            if (element['Standard'] == currentClass) {
                element['subjects'].map((sub) => {
                    if (sub['subjectName'] == currentSubject) {
                        sub['Chapters'] = currentChapters
                    }
                })
            }
        })
        setCourseData(courseData)
    }

    const handleAddChapter = () => {
        courseData.map((element) => {
            if (element['Standard'] == currentClass) {
                element['subjects'].map((sub) => {
                    if (sub['subjectName'] == currentSubject) {
                        sub['Chapters'] =[ ...currentChapters , {id:sub['Chapters'].length+1,name:newChapterName}]
                        setCurrentChapters(sub['Chapters'])
                    }
                })
            }
        })
        
        setCourseData(courseData)
    }


    return (
        <div>
            <Box bg="white" borderWidth="5px" h="50%" p={10} m="50" color="black" px={'center'} >
                <FormControl id="class">

                    <Select placeholder="Select standard " onChange={(e) => {
                        setCurrentClass(e.target.value)
                    }}>
                        {
                            courseData.map(elm =>
                                <option value={elm['Standard']} key={elm['Standard']} >{elm['Standard']}</option>
                            )
                        }
                    </Select>
                    <Stack direction="column">
                        <Box bg="white" h="50%" w="inherit" mt={5} p={2} color="black" px={'center'} >

                            <Select placeholder="Select Subject" onChange={(e) => {
                                handleSubjects(e)
                            }} onClick={() => handleChapter()}>
                                {currentClass !== undefined ?
                                    courseData.map((dt) =>
                                        dt['Standard'] == currentClass ? dt["subjects"].map((subject) =>
                                            <option value={subject['subjectName']} key={subject['subjectName']} >{subject['subjectName']}</option>

                                        ) : null
                                    )
                                    : null
                                }
                            </Select>
                        </Box>

                    </Stack>
                    {
                        currentSubject ?
                            <>
                                <Stack direction="column" spacing={5}>
                                    <h4 p={5}>Subject {currentSubject}</h4>
                                    <Button size="sm" onClick={() => setisAddingNew(true)}>Add Subject</Button>
                                  
                                        {isAddingNew && !isEditing['status'] ?   <Add    newChapterNam={setnewChapterName}  handleAddChapt={handleAddChapter} />                                 
                                       : null}
                                   

                                </Stack>
                            </> :
                            null
                    }

                    <Stack direction="column" spacing={5} color='black' p={10} >
                        {
                            currentChapters ?
                                currentChapters.map((chapter) =>
                                    <> <Stack direction="row">

                                        <Box bg="#b2b6b9" color="black" size="md" fontWeight="semibold" p={5} width="100%" justifyItems="center"><NavLink to={`/topic/${chapter['id']}`}>{chapter['name']}</NavLink>
                                            <IconButton aria-label="Search database" size="md" m={5} icon={<DeleteIcon />} onClick={() => handleDelete(chapter['id'])} />
                                            <IconButton aria-label="Search database" size="md" icon={<EditIcon />} m={5} alignSelf="flex-end" onClick={() => setIsEditing({ id: chapter['id'], status: true })} />
                                            {
                                                isEditing['status'] & isEditing['id'] == chapter['id'] ? <> <Input defaultValue={chapter['name']} m={2} onChange={(e) => { if (e.target.value !== ' ') { setnewChapterName(e.target.value) } }} ></Input>
                                                    <Button onClick={() => handleEdit(chapter['id'])}>Update chapter name</Button>
                                                </> : null
                                            }

                                        </Box>


                                    </Stack>
                                    </>
                                )
                                : null
                        }
                    </Stack>
                </FormControl>
            </Box>
        </div>
    )
}


export default Home
