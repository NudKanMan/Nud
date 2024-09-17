export class CreateActivityRequestDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ownerId: string;
}

export class UpdateActivityRequestDto {
  id: string; // UUID as string
  title: string;
  description: string;
  startDate: string; // ISO formatted date string
  endDate: string; // ISO formatted date string
  user_id: string; // UUID as string
}

// DTO for deleting an activity
export class DeleteActivityRequestDto {
  id: string; // UUID as string
}

// DTO for getting an activity by ID
export class GetActivityRequestDto {
  id: string; // UUID as string
}

// DTO for returning an activity
export class ActivityResponseDto {
  id: string; // UUID as string
  title: string;
  description: string;
  startDate: string; // ISO formatted date string
  endDate: string; // ISO formatted date string
  ownerId: string; // UUID as string
}

export class ListActivitiesResponseDto {
  activities: ActivityResponseDto[];
}

// Empty DTO (used for deletions)
export class EmptyDto {}
