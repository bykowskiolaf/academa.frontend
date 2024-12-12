interface Course {
  uuid: string;
  name: string;
  shortDescription: string;
  picture?: string;
}

interface FullCourse extends Course {
  longDescription: string;
  instructor: string;
}

interface CoursesPaginated {
  content: Course[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
