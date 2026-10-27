export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

// Keep the section hidden until genuine, approved testimonials exist.
export const testimonials: Testimonial[] = [];
