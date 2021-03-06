import { Input, Button, useToast, useDisclosure, ModalOverlay, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add_chapter, fill_data } from "../actions/Actions"

const Add = ({ setisAddingNew }) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()

    useEffect(() => {
        onOpen()
    }, [])

    const [newChapterName, setnewChapterName] = useState('')
    const currentData = useSelector((state) => state.currentData)

    const handleAddChapter = () => {
        if (!newChapterName) {
            alert('enter chapter name')
            setisAddingNew(false)

        }
        else {
            dispatch(add_chapter(newChapterName))
            dispatch(fill_data(currentData.currentClass, currentData.currentSubject))
            setisAddingNew(false)
            toast({
                title: "Chapter Added Successfully .",
                status: "success",
                duration: 5000,
                isClosable: true,
            })

            setnewChapterName('')
        }
    }

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Chapter</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="enter chapter name " onChange={(e) => setnewChapterName(e.target.value)} ></Input>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={() => { onClose(); handleAddChapter() }}>
                            submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Add
