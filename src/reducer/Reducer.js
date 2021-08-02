
const data = require("../Data/Data.json")
const initialState = {
    courseData: data,
    currentData: null
}

function logError(name, reason) {
    console.log(`Error : Found error in ${name} reducer case .
    Problem occured in finding ${reason}`)

}

const reducerFunction = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            let tempCourseData = state.courseData;
            let { currentClass, currentSubject, currentChapters } = state.currentData;
            currentChapters = [...currentChapters, { id: currentChapters.length + 1, name: action.payload.newChapterName }]
            tempCourseData.map(element => {
                if (element['Standard'] == currentClass) {
                    if (element['subjects']) {
                        element['subjects'].map(subs => {
                            if (subs['subjectName'] == currentSubject) {
                                if (subs["Chapters"]) {
                                    subs['Chapters'] = currentChapters
                                }
                            }
                            else {
                                logError("ADD", "Subject name")

                            }
                        })
                    }
                    else {
                        logError("ADD", "Subjects list")

                    }
                }
                else {
                    logError("ADD", "Standard list")

                }
            })
            return Object.assign({}, state, {
                courseData: tempCourseData
            })
        case "DEL": {
            let tempCourseData = state.courseData;
            let { currentClass, currentSubject, currentChapters } = state.currentData;
            tempCourseData.map(element => {
                if (element['Standard'] == currentClass) {
                    if (element['subjects']) {
                        element['subjects'].map(subs => {
                            if (subs['subjectName'] == currentSubject) {
                                if (subs["Chapters"]) {
                                    subs['Chapters'] = currentChapters.filter((element) => element['id'] !== action.payload.id)
                                }
                            }
                            else {
                                logError("DEL", "Subject name")

                            }
                        })
                    }
                    else {
                        logError("DEL", "Subjects list")

                    }
                }
                else {
                    logError("DEL", "Standard list")
                }
            })
            return Object.assign({}, state, {
                courseData: tempCourseData
            })
        }
        case "EDIT": {
            let tempCourseData = state.courseData;
            let { currentClass, currentSubject, currentChapters } = state.currentData;
            let { id, newChapterName } = action.payload;
            currentChapters.map(chapter => {
                if (chapter['id'] == id) {
                    chapter['name'] = newChapterName
                }
            })
            tempCourseData.map(element => {
                if (element['Standard'] == currentClass) {
                    if (element['subjects']) {
                        element['subjects'].map(subs => {
                            if (subs['subjectName'] == currentSubject) {
                                if (subs["Chapters"]) {
                                    subs['Chapters'] = currentChapters
                                }
                            }
                            else {
                                logError("EDIT", "Subject name")

                            }
                        })
                    }
                    else {
                        logError("EDIT", "Subjects list")
                    }
                }
                else {
                    logError("EDIT", "Standard list")

                }
            })
            return Object.assign({}, state, {
                courseData: tempCourseData
            })
        }

        case "FILL": {
            let { currentClass, currentSubject } = action.payload;
            let currentChapters;
            state.courseData.map(element => {
                if (element['Standard'] == currentClass) {
                    if (element['subjects']) {
                        element['subjects'].map(subs => {
                            if (subs['subjectName'] == currentSubject) {

                                currentChapters = subs['Chapters']
                            }
                            else {
                                logError("FILL", "Subject name")

                            }
                        })
                    }
                    else {
                        logError("FILL", "Subjects list")
                    }
                }
                else {
                    logError("FILL", "Standard list")

                }
            })
            return Object.assign({}, state, {
                currentData: { currentChapters, currentSubject, currentClass }
            })
        }
        default:
            return state;
    }

}

export default reducerFunction;
