export interface CourseFilters {
  search?: string;
  category?: string[];
  difficulty?: DifficultyLevel[];
  label?: string[];
  price?: string;
  rating_min?: number;
  sort_by?: SortOption;
  page?: number;
  limit?: number;
  include_draft?: boolean;
  include_archived?: boolean;
  owner_id?: string;
}

export enum DifficultyLevel {
  ALL = "ALL",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}

export enum SortOption {
  NEWEST = "newest",
  RATING_DESC = "rating_desc", 
  RATING_ASC = "rating_asc",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  POPULAR = "popular"
}

export enum CourseLabel {
  NEW = "NEW",
  HOT = "HOT",
  BEST_SELLER = "BEST_SELLER",
  FEATURED = "FEATURED",
  NONE = "NONE"
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  difficulty: string;
  label?: string;
  totalLesion: number;
  owner: {
    id: string;
    email: string;
    fullName: string;
  }
  pricing: {
    regular: number;
    discounted?: number;
  };
  rating: {
    avg: number;
    count: number;
  };
  enrollmentCnt: number;
}

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: string;
  thumbnail: string;
  label: string;
  status: string;
  regularPrice: number;
  discountedPrice?: number;
  ratingAvg: number;
  ratingCnt: number;
  enrollmentCnt: number;
  category: {
    id: string;
    title: string;
    slug: string;
  };
  owner: {
    id: string;
    email: string;
    fullName: string;
  };
  previewImg: string;
  learningOutcomes: string;
  previewVideo: string;
  requirements: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  data: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} 