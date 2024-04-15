import model from "./model.js";

export const findCourseById = (id) => model.find({ id: id });
export const findAllCourses = () => model.find();
export const updateCourse = (courseId, course) =>  model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
export const createCourse = (course) => {
    delete course._id
    return model.create(course);
}