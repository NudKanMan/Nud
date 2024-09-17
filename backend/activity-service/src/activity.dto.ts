// DTO for creating an activity
export class CreateActivityRequestDto {
  title: string;
  description: string;
  start_date: string; // ISO formatted date string
  end_date: string; // ISO formatted date string
  owner_id: string; // UUID as string
}

// DTO for updating an activity
export class UpdateActivityRequestDto {
  id: string; // UUID as string
  title: string;
  description: string;
  start_date: string; // ISO formatted date string
  end_date: string; // ISO formatted date string
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
  start_date: string; // ISO formatted date string
  end_date: string; // ISO formatted date string
  owner_id: string; // UUID as string
}

export class ListActivitiesResponseDto {
  activities: ActivityResponseDto[];
}

// Empty DTO (used for deletions)
export class EmptyDto {}
