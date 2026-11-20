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
      name: "Vikram Singhania",
      role: "Head of Brand Marketing, FinEdge",
      avatar: "/images/testimonials/avatar-1.png",
      rating: 5,
      quote:
        "Art Visual translated our complex fintech product into a visually captivating brand film. The cinematic quality and storytelling exceeded our leadership team's expectations.",
    },
    {
      id: "testimonial-02",
      name: "Ananya Deshmukh",
      role: "Creative Director, Lumina Apparel",
      avatar: "/images/testimonials/avatar-2.png",
      rating: 5,
      quote:
        "Their team brought extraordinary visual ambition to our festive commercial campaign. Delivery was fast, on schedule, and the film drove our highest ad engagement of the year.",
    },
    {
      id: "testimonial-03",
      name: "Karthik Raghavan",
      role: "Founder & CEO, Aura Tech",
      avatar: "/images/testimonials/avatar-3.png",
      rating: 5,
      quote:
        "From initial concept storyboards to the final 4K color grade, Art Visual handled the production flawlessly. They are our go-to creative video partner.",
    },
    {
      id: "testimonial-04",
      name: "Pooja Sundaram",
      role: "VP of Growth, Kaveri Retail",
      avatar: "/images/testimonials/avatar-1.png",
      rating: 5,
      quote:
        "The product explainers and social cutdowns Art Visual produced helped us scale conversions across all our paid performance marketing channels.",
    },
    {
      id: "testimonial-05",
      name: "Rahul Nambiar",
      role: "Director of Communications, Vertex Mobility",
      avatar: "/images/testimonials/avatar-2.png",
      rating: 5,
      quote:
        "High production value, exceptional lighting and sound design, and an incredibly collaborative crew. Art Visual is true masters of visual storytelling.",
    },
    {
      id: "testimonial-06",
      name: "Meera Krishnan",
      role: "Marketing Lead, Solas Coffee Co.",
      avatar: "/images/testimonials/avatar-3.png",
      rating: 5,
      quote:
        "Working with Art Visual was seamless. They captured the artisan craft of our origin story with unmatched cinematic elegance.",
    },
  ],
};
