export class CreateReviewRequestDto {
  activityId: string;
  userId: string;
  rating: number;
  comment: string;
}

export class FindByActivityIdRequestDto {
  activityId: string;
}

export class EditReviewById {
  reviewId: string;
  editReviewObject: EditReviewObject;
}

export class EditReviewObject {
  comment: string;
  rating: string;
}
