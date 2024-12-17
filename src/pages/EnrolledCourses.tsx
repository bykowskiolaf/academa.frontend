import useCourses from '@/hooks/useCourses/useCourses';
import { Link } from '@tanstack/react-router';

const EnrolledCoursesPage = () => {
  const { enrolledCourses } = useCourses({});

  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <p className="text-lg font-medium text-muted-foreground">
          You've not signed up for any courses!
        </p>
        <p className="text-lg font-medium text-muted-foreground">
          Go{' '}
          <Link to="/courses" className="text-primary underline">
            sign up
          </Link>{' '}
          for some.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-bold text-foreground dela-gothic mb-6">
        My Enrolled Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {enrolledCourses.map(course => (
          <div
            key={course.uuid}
            className="bg-card shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
            {course.picture && (
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${course.picture})`
                }}
              />
            )}
            <div className="p-4 flex flex-col justify-between">
              <h2 className="font-bold text-xl text-foreground dela-gothic mb-2">
                {course.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {course.shortDescription}
              </p>
              <Link
                to={`/course/${course.uuid}`}
                className="mt-auto text-primary font-bold hover:underline">
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
