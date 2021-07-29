import React, { useState } from 'react'
import { Box, Select, Stack, Button } from "@chakra-ui/react"
import Add from './Add';
import ListChapters from './ListChapters';
const Home = () => {
    let data = require("../Data/Data.json")

    const [currentClass, setCurrentClass] = useState();
    const [currentSubject, setCurrentSubject] = useState();
    const [currentChapters, setCurrentChapters] = useState()
    const [courseData, setCourseData] = useState(data)
    const [isEditing, setIsEditing] = useState({ id: null, status: false })
    const [newChapterName, setnewChapterName] = useState('')
    const [isAddingNew, setisAddingNew] = useState(false)

    // this will store current subject chose by user
    const handleChapter = () => {
        setisAddingNew(false)
        setIsEditing({ id: null, status: false })
        setCurrentChapters(courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'])
    }

    const handleDelete = (idx) => {
        setisAddingNew(false)
        setIsEditing({ id: null, status: false })
        setCurrentChapters(currentChapters.filter((element) => element['id'] !== idx))
        courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'] = currentChapters.filter((element) => element['id'] !== idx)
        setCourseData(courseData)
    }

    const handleEdit = (idx) => {
        setIsEditing(false)
        currentChapters.find(chapter => chapter['id'] == idx)['name'] = newChapterName
        courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'] = currentChapters
        setCourseData(courseData)
    }

    const handleAddChapter = () => {
        courseData.find(element => element['Standard'] == currentClass)['subjects'].map(sub => {
            if (sub['subjectName'] == currentSubject) {
                sub['Chapters'] = [...currentChapters, { id: sub['Chapters'].length + 1, name: newChapterName }]
                setCurrentChapters(sub['Chapters'])

            }
        })
        setCourseData(courseData)
        setisAddingNew(false)
    }


    return (
        <div>
            <Box bg="white" borderWidth="5px" h="50%" p={10} m="50" color="black" px={'center'} >

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
                            setCurrentSubject(e.target.value)
                        }} onClick={() => handleChapter()}>
                            {currentClass ? courseData.find(element => element['Standard'] == currentClass)['subjects'].map((subject) =>
                                <option value={subject['subjectName']} key={subject['subjectName']} >{subject['subjectName']}</option>

                            ) : null


                            }
                        </Select>
                    </Box>

                </Stack>
                {currentSubject ?
                    <>
                        <Stack direction="column" spacing={5}>
                            <h4 p={5}>Subject {currentSubject}</h4>
                            <Button size="sm" onClick={() => setisAddingNew(true)}>Add Subject</Button>

                            {isAddingNew && !isEditing['status'] ? <Add newChapterNam={setnewChapterName} handleAddChapt={handleAddChapter} />
                                : null}


                        </Stack>
                    </> :
                    null
                }
                <ListChapters currentChapters={currentChapters} handleDelete={handleDelete} setIsEditing={setIsEditing} handleEdit={handleEdit} isEditing={isEditing} setnewChapterName={setnewChapterName} />

            </Box>
        </div>
    )
}


export default Home
