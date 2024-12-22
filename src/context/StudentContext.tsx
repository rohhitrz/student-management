import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Student, StudentContextType } from '../types/student';
import { loadStudents, saveStudents } from '../utils/storage';

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => loadStudents());
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  // Save to localStorage whenever students change
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: crypto.randomUUID(),
    };
    setStudents(prev => [...prev, newStudent]);
  }, []);

  const updateStudent = useCallback((id: string, updatedStudent: Student) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? updatedStudent : student
    ));
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  }, []);

  const searchStudents = useCallback((query: string) => {
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.course.toLowerCase().includes(query.toLowerCase()) ||
      student.yearOfAdmission.toString().includes(query)
    );
    setFilteredStudents(filtered);
  }, [students]);

  const filterStudents = useCallback((course?: string, year?: number) => {
    let filtered = [...students];
    
    if (course) {
      filtered = filtered.filter(student => student.course === course);
    }
    
    if (year) {
      filtered = filtered.filter(student => student.yearOfAdmission === year);
    }
    
    setFilteredStudents(filtered);
  }, [students]);

  const value = {
    students: filteredStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
    filterStudents,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};