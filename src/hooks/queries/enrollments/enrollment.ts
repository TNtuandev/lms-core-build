export interface Enrollment {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  userId: string
  productId: string
  expiresAt: any
  user: User
  product: Product
}

export interface User {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  type: string
  email: string
  username: any
  passwordHash: string
  isEmailVerified: boolean
  fullName: string
  firstName: string
  lastName: string
  skill: string
  bio: string
  phoneNumber: string
  avatarUrl: any
  coverPhotoUrl: any
  status: string
}

export interface Product {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  type: string
  categoryId: string
  category: string
  ownerId: string
  thumbnail: string
  label: string
  status: string
  ratingAvg: number
  ratingCnt: number
  enrollmentCnt: number
  course: Course
}

export interface Course {
  id: string
  regularPrice: number
  discountedPrice: number
  requirements: string
  learningOutcomes: string
  previewVideo: string
  previewImg: string
  difficulty: string
  maxEnrollment: number
  tags: any
  isAllowFaq: boolean
  isDripContent: boolean
  overview: any
  language: any
  certification: any
  totalCompletedLessons: number
}
