/**
 * Testimonials section data definitions
 */

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number; // 1 to 5
  quote: string;
}

export interface TestimonialsData {
  badge: {
    text: string;
  };
  headline: {
    text: string;
    line1?: string;
    line2?: string;
  };
  items: TestimonialItem[];
}

export const TESTIMONIALS_DEFAULTS: TestimonialsData = {
  badge: {
    text: "What Our Clients Say",
  },
  headline: {
    text: "Beyond Projects, Building Relationships",
    line1: "Beyond Projects,",
    line2: "Building Relationships",
  },
  items: [
    {
      id: "testimonial-01",
      name: "Rohan Mehta",
      role: "Software Engineer, Flipkart",
      avatar: "/images/testimonials/avatar-1.png",
      rating: 5,
      quote:
        "Take a closer look at thoughtfully designed spaces that combine comfort, elegance, and modern living",
    },
    {
      id: "testimonial-02",
      name: "Arjun Sharma",
      role: "MBA Student, IIM Bangalore",
      avatar: "/images/testimonials/avatar-2.png",
      rating: 5,
      quote:
        "The Wi-Fi never drops, the food is chef-cooked, and my commute is a 4-minute walk to the metro. Worth every rupee.",
    },
    {
      id: "testimonial-03",
      name: "Karthik Rao",
      role: "Product Designer, Swiggy",
      avatar: "/images/testimonials/avatar-3.png",
      rating: 5,
      quote:
        "Moved in on Sunday, got my keys in minutes, and dinner was ready. Couldn't have been smoother.",
    },
    {
      id: "testimonial-04",
      name: "Rohan Mehta",
      role: "Software Engineer, Flipkart",
      avatar: "/images/testimonials/avatar-1.png",
      rating: 5,
      quote:
        "Take a closer look at thoughtfully designed spaces that combine comfort, elegance, and modern living",
    },
    {
      id: "testimonial-05",
      name: "Arjun Sharma",
      role: "MBA Student, IIM Bangalore",
      avatar: "/images/testimonials/avatar-2.png",
      rating: 5,
      quote:
        "The Wi-Fi never drops, the food is chef-cooked, and my commute is a 4-minute walk to the metro. Worth every rupee.",
    },
    {
      id: "testimonial-06",
      name: "Karthik Rao",
      role: "Product Designer, Swiggy",
      avatar: "/images/testimonials/avatar-3.png",
      rating: 5,
      quote:
        "Moved in on Sunday, got my keys in minutes, and dinner was ready. Couldn't have been smoother.",
    },
  ],
};
