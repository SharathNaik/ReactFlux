import React, { useState, useEffect } from 'react';

import CourseForm from './CourseForm';

import courseStore from '../stores/courseStore';

import * as courseActions from "../actions/courseActions";

import { toast } from 'react-toastify';

const ManageCoursePage = props => {

    const [errors, setErrors] = useState({});

    const [courses, setCourses] = useState(courseStore.getCourses());

    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect(() => {
        courseStore.addChangeListener(onChange);

        const slug = props.match.params.slug; //from the path `/courses/:slug`

        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug));
        }

        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    function handleChange({ target }) {//de-Structuring
        setCourse(
            {
                ...course,
                [target.name]: target.value
            }
        );
    }

    function formIsValid() {
        const _errors = {};

        if (!course.title) _errors.title = "Title is Required";
        if (!course.authorId) _errors.authorId = "Author Id is Required";
        if (!course.category) _errors.category = "Category is Required";

        setErrors(_errors);

        //Form is Valid if object has no properties
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        //If form is invalid
        if (!formIsValid()) return;
        courseActions.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success('Course Saved.');
        });


    }



    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm
                errors={errors}
                course={course}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default ManageCoursePage;