import useCourses from '@/hooks/useCourses/useCourses';
import { Link, useParams } from '@tanstack/react-router';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import CourseActionButton from './components/CourseActionButton';

const CoursePage = () => {
  const { courseUuid } = useParams({
    from: '/_dashboard/course/$courseUuid'
  });

  const {
    course,
    enrolledCourses,
    refetchEnrolledCourses,
    coursesIsLoading,
    coursesError
  } = useCourses({
    uuid: courseUuid
  });

  const [isEnrolled, setIsEnrolled] = useState(
    enrolledCourses.some(enrolledCourse => enrolledCourse.uuid === courseUuid)
  );

  if (coursesIsLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-foreground">
        <LoaderIcon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (coursesError || !course) {
    return (
      <div className="p-4 text-foreground">
        <h1 className="text-2xl font-bold dela-gothic">Course not found</h1>
        <p>Sorry, we couldn&apos;t find the course you&apos;re looking for.</p>
      </div>
    );
  }

  useEffect(() => {
    setIsEnrolled(
      enrolledCourses.some(enrolledCourse => enrolledCourse.uuid === courseUuid)
    );
    console.log(enrolledCourses, courseUuid);
  }, [enrolledCourses, courseUuid]);

  return (
    <div className="w-full text-foreground">
      {/* Hero Section */}
      <div
        className="relative w-full h-64 sm:h-96 flex items-center justify-center bg-card text-card-foreground rounded-xl"
        style={{
          backgroundImage: course.picture
            ? `url(${course.picture})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        {/* Overlay */}
        <div className="absolute inset-0" />
        <div className="relative z-10 p-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold dela-gothic text-white">
            {course.name}
          </h1>
          <p className="text-white text-lg mt-2">{course.shortDescription}</p>
        </div>
      </div>

      {/* Course Details Section */}
      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        <h2 className="text-xl font-bold dela-gothic mb-4">
          About this course
        </h2>
        <p className="mb-6">{course.longDescription}</p>

        <div className="flex justify-between items-center mt-8">
          <Link to="/courses" className="text-primary hover:underline">
            &larr; Back to Courses
          </Link>
          <CourseActionButton
            isEnrolled={isEnrolled}
            callback={refetchEnrolledCourses}
            course={course}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
