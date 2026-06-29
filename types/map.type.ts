export interface Destination {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  description: string;
  longitude: number;
  latitude: number;
  tags: string[];
  visitDuration: string;
  trending?: boolean;
}
