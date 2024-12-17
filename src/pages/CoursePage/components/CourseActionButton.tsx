import { Button } from '@/components/ui/button';
import useCourses from '@/hooks/useCourses/useCourses';
import { toast } from 'react-toastify';
interface SignUpButtonProps {
  course: FullCourse;
  isEnrolled: boolean;
  callback: () => void;
}

const CourseActionButton = ({
  course,
  isEnrolled,
  callback
}: SignUpButtonProps) => {
  const { signUpToCourse, dropCourse } = useCourses({});

  const user = JSON.parse(localStorage.getItem('user') || '');

  if (user.role !== 'STUDENT') return null;

  const handleCourseAction = () => {
    const func = isEnrolled ? dropCourse : signUpToCourse;

    const messages = {
      pending: isEnrolled ? 'Dropping course...' : 'Signing up...',
      success: isEnrolled ? 'Course dropped!' : 'Signed up!',
      error: isEnrolled ? 'Failed to drop course' : 'Failed to sign up'
    };

    toast.promise(func(course.uuid), messages).then(() => {
      callback();
    });
  };

  return (
    <Button variant="default" onClick={handleCourseAction}>
      {isEnrolled ? 'Drop course' : 'Sign up'}
    </Button>
  );
};

export default CourseActionButton;
