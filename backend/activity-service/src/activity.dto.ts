export class CreateActivityRequestDto {
  title: string;
  description: string;
  ownerId: string;
  maxParticipants: number;
  startDate: string;
  endDate: string;
}

export class UpdateActivityRequestDto {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ownerId: string;
}

export class JoinActivityRequestDto {
  id: string;
  userId: string;
}

export class LeaveActivityRequestDto {
  id: string;
  userId: string;
}

export class DeleteActivityRequestDto {
  id: string;
  ownerId: string;
}

export class GetActivityRequestDto {
  id: string;
  userId: string;
}

export class EmptyDto {}
