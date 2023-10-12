export type ICreatePlanData = {
  id: number;
  agency_id: number;
  plan_name: string;
  images: string[];
  starting_location: string;
  price: number;
  cover_location: string[];
  tour_duration: number;
  starting_time: Date;
  total_meals: number;
  description: string;
  booking_deadline: Date;
};
