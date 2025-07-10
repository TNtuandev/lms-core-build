export interface IntructorResponsive {
  data: {
    auditInfo: {
      createdAt: string;
      deletedAt: string;
      updatedAt: string;
    };
    bio: string;
    cvUrl: string;
    expertise: string;
    isVerified: boolean;
    ratingAverage: string;
    totalReviews: string;
    userId: string;
  }
}

export interface LearnerProfile {
  data: {
    _id: string;
    _userId: string;
    _bio: string | null;
    _dateOfBirth: string | null;
    _educationLevel: string | null;
    _interests: string | null;
    _gender: 'male' | 'female' | 'other'; // assuming possible values
    _totalCoursesEnrolled: number;
    _totalCoursesInProgress: number;
    _totalCoursesCompleted: number;
  }
}