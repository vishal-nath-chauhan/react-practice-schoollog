
const data = require("../Data/Data.json")
const initialState = {
    courseData: data,
    currentData: null
}

const reducerFunction = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            let tempCourseData = state.courseData;
            let { currentClass, currentSubject, currentChapters } = state.currentData;
            currentChapters = [...currentChapters, { id: currentChapters.length + 1, name: action.payload.newChapterName }]
            console.log("new current chapters ",currentChapters)
            tempCourseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'] = currentChapters
            console.log("chapters after calling add ",tempCourseData)
            return Object.assign({}, state, {
                courseData: tempCourseData
            })
        // courseData.find(element => element['Standard'] == currentClass)['subjects'].map(sub => {
        //     if (sub['subjectName'] == currentSubject) {
        //         let currentChapters = courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters']
        //         sub['Chapters'] = [...currentChapters, { id: sub['Chapters'].length + 1, name: newChapterName }]
        //     }
        case "DEL": {
            let tempCourseData = state.courseData;
            let { currentClass, currentSubject, currentChapters } = state.currentData;
            tempCourseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'] = currentChapters.filter((element) => element['id'] !== action.payload.id)
            return Object.assign({}, state, {
                courseData: tempCourseData
            })
        }
        case "EDIT":
                    // currentData.currentChapters.find(chapter => chapter['id'] == idx)['name'] = newChapterName
        // // courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters'] = currentChapters
            return null

        case "FILL": {
            let { currentClass, currentSubject } = action.payload;
            let currentChapters = state.courseData.find(element => element['Standard'] == currentClass)['subjects'].find(subs => subs['subjectName'] == currentSubject)['Chapters']
            return Object.assign({}, state, {
                currentData: { currentChapters, currentSubject, currentClass }
            })
        }
        default:
            return state;
    }

}

export default reducerFunction;
