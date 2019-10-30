import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionType from '../actions/actionTypes';

export function saveCourse(course) {
    return courseApi.saveCourse(course).then(savedCourse => {
        //dispatcher will inform all stores about a new course creation
        dispatcher.dispatch({
            actionType: course.id ? actionType.UPDATE_COURSE : actionType.CREATE_COURSE,
            course: savedCourse
        });
    });
}


export function loadCourses() {
    return courseApi.getCourses().then(courses => {
        dispatcher.dispatch({
            actionType: actionType.LOAD_COURSES,
            courses: courses
        });
    });
}


export function deleteCourse(id) {
    return courseApi.deleteCourse(id).then(() => {
        dispatcher.dispatch({
            actionType: actionType.DELETE_COURSE,
            id: id
        });
    });
}