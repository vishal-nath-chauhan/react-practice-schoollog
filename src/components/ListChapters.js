import React from 'react';
import {Box,Input,IconButton,Button,Stack} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom';
const ListChapters = ({currentChapters,handleDelete,setIsEditing,handleEdit,isEditing,setnewChapterName}) => {
    return (
        <>
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
        </>
    )
}

export default ListChapters
