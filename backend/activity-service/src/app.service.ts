import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/entities/activity.entity';
import { In, Repository } from 'typeorm';
import {
  CreateActivityRequestDto,
  DeleteActivityRequestDto,
  GetActivityRequestDto,
  JoinActivityRequestDto,
  UpdateActivityRequestDto,
} from './activity.dto';
import { ActivityParticipant } from './entities/activity-participant.entity';
import { Observable, lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface FriendMatchingGrpcService {
  RequestFriend(data: any): Observable<any>;
  AcceptFriend(data: any): Observable<any>;
  GetFriendList(data: any): Observable<any>;
  GetFriendRequestList(data: any): Observable<any>;
  IsFriend(data: any): Observable<any>;
  RejectFriend(data: any): Observable<any>;
}

@Injectable()
export class AppService {
  private friendMatchingService: FriendMatchingGrpcService;
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(ActivityParticipant)
    private activityParticipantsRepository: Repository<ActivityParticipant>,
    @Inject('FRIEND_MATCHING_PACKAGE')
    private readonly friendMatchingGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.friendMatchingService =
      this.friendMatchingGrpcService.getService<FriendMatchingGrpcService>(
        'FriendMatchingService',
      );
  }

  async findAct(id: string) {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    console.log('activity', activity);
    return activity;
  }

  async findActivity({ id, userId }: GetActivityRequestDto): Promise<any> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    const friend = await lastValueFrom(
      this.friendMatchingService.GetFriendList({ userId: userId }),
    );
    const allParticipants = await this.activityParticipantsRepository.find({
      where: { activityId: id },
    });

    const participants = [];
    // TODO .map is not a function undefined
    friend.friends.map((friend) => {
      console.log('friend', friend);
      if (
        allParticipants.find((participant) => participant.userId === friend.id)
      ) {
        participants.push(friend);
      }
    });

    return {
      activity: activity,
      participants: participants,
      isOwner: activity.ownerId === userId,
    };
  }

  async findAllActivities() {
    const activities = await this.activitiesRepository.find();
    console.log('activities', activities);
    return {
      activities: activities,
    };
  }

  async joinActivity(data: JoinActivityRequestDto): Promise<Activity> {
    const activity = await this.findAct(data.id);
    if (!activity || activity.status === 'CLOSED') {
      throw new NotFoundException('Activity is already closed or not found');
    }
    const existUser = await this.activityParticipantsRepository.findOne({
      where: { userId: data.userId, activityId: data.id },
    });
    if (existUser) {
      throw new NotFoundException('User is already joined this activity!');
    }
    activity.currentParticipants += 1;
    const participant = await this.activityParticipantsRepository.save({
      activityId: data.id,
      userId: data.userId,
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async leaveActivity(data: JoinActivityRequestDto): Promise<Activity> {
    const activity = await this.findAct(data.id);
    if (!activity || activity.status === 'CLOSED') {
      throw new NotFoundException('Activity is already closed or not found');
    }
    activity.currentParticipants -= 1;
    await this.activityParticipantsRepository.delete({
      userId: data.userId,
      activityId: data.id,
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async createActivity(
    createActivityDto: CreateActivityRequestDto,
  ): Promise<Activity> {
    console.log('createActivityDto', createActivityDto);
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      startDate: new Date(createActivityDto.startDate),
      endDate: new Date(createActivityDto.endDate),
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async updateActivity(
    updateActivityDto: UpdateActivityRequestDto,
  ): Promise<Activity> {
    const activity = await this.findAct(updateActivityDto.id);
    if (activity.ownerId !== updateActivityDto.ownerId) {
      throw new UnauthorizedException(
        'You are not authorized to update this activity',
      );
    }
    if (updateActivityDto.title) activity.title = updateActivityDto.title;
    if (updateActivityDto.description)
      activity.description = updateActivityDto.description;
    if (updateActivityDto.startDate)
      activity.startDate = new Date(updateActivityDto.startDate);
    if (updateActivityDto.endDate)
      activity.endDate = new Date(updateActivityDto.endDate);
    return this.activitiesRepository.save(activity);
  }

  async deleteActivity(data: DeleteActivityRequestDto): Promise<boolean> {
    const { id, ownerId } = data;
    const activity = await this.findAct(id);
    if (
      !activity ||
      activity.status === 'CLOSED' ||
      activity.ownerId !== ownerId
    ) {
      throw new UnauthorizedException(
        'You are not authorized to delete this activity or the activity is already closed',
      );
    }
    const result = await this.activitiesRepository.delete({ id });
    return true;
  }
}
