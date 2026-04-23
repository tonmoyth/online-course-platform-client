export interface Instructor {
  id: string;
  name: string;
  image: string | null;
}

export interface Course {
  id: string;
  instructorId: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  priceType: "FREE" | "PAID";
  price: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  instructor: Instructor;
  lessons?: any[]; // Populated when fetching single course details
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  meta: PaginatedMeta;
  data: T;
}

export interface CourseQuery {
  searchTerm?: string;
  page?: string | number;
  limit?: string | number;
  category?: string;
  difficulty?: string;
  priceType?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
