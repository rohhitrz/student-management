export interface Student {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  yearOfAdmission: number;
  course: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

export interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Student) => void;
  deleteStudent: (id: string) => void;
  searchStudents: (query: string) => void;
  filterStudents: (course?: string, year?: number) => void;
}

export const AVAILABLE_COURSES = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Business Administration',
  'Economics'
] as const;