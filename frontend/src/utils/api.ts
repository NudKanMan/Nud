// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    withCredentials: true,
});

export const login = (email: string, password: string) =>
    api.post('/user-service/login', { email, password });

export const registerUser = (data: { email: string; password: string; name: string; }) =>
    api.post('/user-service/register', data);


export const fetchUserProfile = (userId: string) =>
    api.get(`/user-service/users/${userId}`);

export const updateUserProfile = (userId: string, data: { name?: string; bio?: string }) =>
    api.put(`/user-service/users/${userId}`, data);

export const fetchActivities = () =>
    api.get('/activity-service/activities');

export const createActivity = (data: any) =>
    api.post('/activity-service/activities', data);

export const fetchReviews = (activityId: string) =>
    api.get(`/review-service/reviews/${activityId}`);

export const addReview = (activityId: string, reviewData: any) =>
    api.post(`/review-service/reviews/${activityId}`, reviewData);

export default api;
