import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Input, IconButton, Button, Stack, HStack, Spacer, useToast, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fill_data, delete_chapter, edit_chapter } from '../actions/Actions';

const ListChapters = ({ currentSubject, currentClass }) => {

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isEditing, setIsEditing] = useState({ id: null, status: false })
    const [newChapterName, setnewChapterName] = useState('')
    const dispatch = useDispatch()
    const courseData = useSelector((state) => state.courseData)
    useEffect(() => {
        dispatch(fill_data(currentClass, currentSubject))
    }, [currentClass, currentSubject])
    const currentData = useSelector((state) => state.currentData)



    const handleEdit = (idx) => {
        if (!newChapterName) {
            alert("Enter valid chapter name")
            setIsEditing(false)

        }
        else {
            setIsEditing(false)
            dispatch(edit_chapter(idx, newChapterName))
            dispatch(fill_data(currentClass, currentSubject))

            toast({
                title: "Chapter edited .",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleDelete = (idx) => {
        setIsEditing({ id: null, status: false })
        dispatch(delete_chapter(idx))
        dispatch(fill_data(currentClass, currentSubject))
        toast({
            title: "Chapter Deleted .",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    }

    return (
        <>
            <Stack direction="column" spacing={5} color='black' p="20px" m="10px" >
                {
                    currentData ?
                        currentData.currentChapters.map((chapter) => (
                            <HStack key={chapter['id']} border='1px' borderRadius='5px' shadow='sm' mb='10px' px='10px' py='5px'>
                                <Box as={Link} to={`/topic/${chapter['id']}`}>
                                    <h4> {chapter['name']}</h4>
                                </Box>
                                <Spacer as={Link} to={`/topic/${chapter['id']}`} />
                                <Box>
                                    <IconButton colorScheme='red' variant='outline' size="md" mr={5} icon={<DeleteIcon />} onClick={() => handleDelete(chapter['id'])} />
                                    <IconButton colorScheme='blue' variant='outline' size="md" icon={<EditIcon />} m={5} onClick={() => { setIsEditing({ id: chapter['id'], status: true }); onOpen() }} />
                                </Box>
                                {
                                    isEditing['status'] & isEditing['id'] == chapter['id'] ? <>
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Edit Chapter</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Input defaultValue={chapter['name']} m={2} onChange={(e) => { if (e.target.value !== ' ') { setnewChapterName(e.target.value) } }} ></Input>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="green" mr={3} onClick={() => { onClose(); handleEdit(chapter['id']) }}>
                                                        Update Name
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </> : null
                                }
                            </HStack>
                        ))
                        : null
                }
            </Stack>
        </>
    )
}

export default ListChapters
