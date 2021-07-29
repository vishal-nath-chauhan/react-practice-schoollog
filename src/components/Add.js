import { Input, Button } from '@chakra-ui/react'
const Add = ({newChapterNam,handleAddChapt}) => {

    return (
        <>
            <Input placeholder="enter chapter name " onChange={(e) => newChapterNam(e.target.value)} ></Input>
            <Button width="50%" alignItems="center" onClick={() => handleAddChapt()}>Add Chapter</Button>
            </>
    )
}

export default Add
