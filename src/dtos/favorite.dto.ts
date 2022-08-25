export interface CreateFavoriteDto {
  article: string;
}

export interface GetFavoriteArticleDto {
  user: string;
  page: number;
  limit: number;
}
