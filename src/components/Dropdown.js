import React from 'react'
import {Select} from "@chakra-ui/react"
const Dropdown = (func) => {
    return (
        <>
             <Select placeholder="Select Subject" onChange={(e) => {func(e)}} >
                            {courseData.find(element => element['Standard'] == currentClass)['subjects'].map((subject) =>
                                <option value={subject['subjectName']} key={subject['subjectName']} >{subject['subjectName']}</option>

                            ) }
                        </Select>
        </>
    )
}

export default Dropdown
