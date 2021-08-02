export const add_chapter = (newChapterName) => {
    return {
        type: "ADD",
        payload: {
            newChapterName
        }
    }

}

export const edit_chapter = (id, newChapterName) => {
    return {
        type: "EDIT",
        payload: {
            id,
            newChapterName
        }
    }
}

export const delete_chapter = (id) => {
    return {
        type: "DEL",
        payload: {
            id
        }
    }
}

export const fill_data = (currentClass, currentSubject) => {
    return {
        type: "FILL",
        payload: {
            currentSubject,
            currentClass
        }
    }
}