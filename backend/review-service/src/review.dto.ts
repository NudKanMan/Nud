export class CreateReviewRequestDto {
  activityId: string;
  userId: string;
  rating: number;
  comment: string;
}

export class FindByActivityIdRequestDto {
  activityId: string;
}
