export type ViewKey = "home" | "profile" | "health" | "timeline" | "community";

export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  birthday: string;
  city: string;
  createdAt: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  weight?: number;
  vaccine: string;
  nextVaccineDate: string;
  deworming: string;
  nextDewormingDate: string;
  notes: string;
}

export interface DailyMoment {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  petName: string;
  city: string;
  date: string;
  content: string;
  isDemo: boolean;
}

export interface DemoFriend {
  id: string;
  name: string;
  petName: string;
  breed: string;
  city: string;
  color: "coral" | "blue" | "green";
}
