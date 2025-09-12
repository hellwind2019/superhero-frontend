export interface Hero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  first_image: string;
}
export interface HeroImage {
  id?: number;
  hero_id?: number;
  image_url: string;
  caption?: string;
}
