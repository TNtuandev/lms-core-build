export interface CourseFilters {
  search?: string;
  category?: string[];
  difficulty?: DifficultyLevel[];
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

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  difficulty: string;
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