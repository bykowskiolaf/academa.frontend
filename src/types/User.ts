interface User {
  uuid: string;
  email: string;
  givenName: string;
  familyName: string;
  picture?: string;
  locale: string;
  role: Role;
}

interface Student extends User {
  courses: Course[];
}

enum Role {
  STUDENT,
  INSTRUCTOR,
  ADMIN
}
