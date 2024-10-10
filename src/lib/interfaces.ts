export interface classroomInterface {
  classroomName: string;
  students: string[];
  notes: string[];
  forums: string[];
}
export interface decodedToken {}
export interface courseInterface {
  content: string[];
  curriculum: string[];
  type: string;
  students: string[];
}
export interface purchaseInfo {
  courseId: string;
}
export interface addToClassroom {
  classroomId: string;
  students: string[];
}
export interface testimonials {
  studentId: string;
  studentName: string;
  rating: number;
  review: string;
}
