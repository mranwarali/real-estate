export const footerLinks = [
  {
    heading: "Company",
    items: [
      { title: "All Products", link: "/products" },
      { title: "Services", link: "/services" },
      { title: "Blog", link: "/blog" },
      { title: "Contact", link: "/contact" },
    ],
  },
  //   {
  //     heading: "About",
  //     items: [
  //       { title: "Castro", link: "/location/castro" },
  //       { title: "Haight Ashbury", link: "/location/haight-ashbury" },
  //     ],
  //   },
];

// export const categories = [
//   {
//     heading: "Lists by Category",
//     items: [
//       { title: "For Sale", count: 12, link: "/for-sale" },
//       { title: "For Rent", count: 6, link: "/for-rent" },
//       { title: "Apartment", count: 11, link: "/category/apartment" },
//       { title: "House", count: 8, link: "/category/house" },
//       { title: "Office", count: 4, link: "/category/office" },
//     ],
//   },
// ];

// export const cities = [
//   {
//     heading: "Top Cities",
//     items: [
//       { title: "New York", link: "/city/new-york" },
//       { title: "California", link: "/city/california" },
//       { title: "Mexico", link: "/city/mexico" },
//     ],
//   },
// ];

export const address = [
  {
    heading: "Address",
    items: [
      {
        icon: "bx bx-map",
        value: "Brooklyn, New York, United States",
      },
      {
        icon: "bx bx-envelope",
        value: "Info@dreamhome.com",
      },
      {
        icon: "bx bx-phone-call",
        value: "+0124-4565789",
      },
    ],
  },
];

export const userMenuData = {
  loggedInData: [
    { label: "My Profile", path: "/settings/profile", type: "link" },
    { label: "Account Settings", path: "/settings", type: "link" },
    { label: "Logout", path: null, type: "button", action: "logout" },
  ],
  loggedOutData: [{ label: "Login/Signup", path: "/login", type: "link" }],
};

export const heroSection = {
  heading: {
    firstPart: "Find Your",
    highlight: "Perfect Place",
    lastPart: "With Us",
  },
  description:
    "We are recognized for exceeding client expectations and delivering great results through dedication, ease of process",
};

export const propertyList = {
  heading: "Discover Our Featured Listings",
  description: "Explore a curated selection of homes tailored just for you.",
  viewAllBtn: " View All Properties",
  viewAllBtnIcon: "bx-arrow-back",
};

export const propertyByCity = {
  heading: "Properties by Cities",
  description: "Find your dream home in India's top locations.",
};

export const enquiryBanner = {
  content: {
    topTitle: "Contact Us Today",
    mainHeading:
      "Looking to Buy a new property or Sell an existing one? Dream home provides an awesome solution!",
  },
  actions: {
    primary: { label: "Submit Enquiry", link: "/enquiry" },
    secondary: { label: "Contact Us", link: "/contact" },
  },
};

export const footerData = {
  companyDesc:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words",
  copyrightPara: "Homez. All rights reserved.",
};

export const newsletterData = {
  heading: "Newsletter",
  description:
    "Subscribe to our weekly Newsletter and receive updates via email.",
  buttonText: "Submit",
};

export const contactSections = [
  {
    title: "For inquiries contact",
    members: [
      {
        name: "Amy Miller",
        position: "Public Relations Manager",
        address: "774 NE 84th St Miami, FL 33879",
        email: "amy.miller@houzez.com",
      },
      {
        name: "Kyle Parker",
        position: "Public Relations Associated",
        address: "774 NE 84th St Miami, FL 33879",
        email: "kyle.parker@houzez.com",
      },
    ],
  },
  {
    title: "Corporate Headquarters",
    address: "1584 Biscayne Boulevard",
    location: "Miami FL, 33176",
  },
];

import settingIcon from "../assets/images/setting-icon.webp";

export const aboutUsData = {
  title: "Our Long-Standing Experience",
  paragraph:
    "Welcome to Dream Home. A brand-new community featuring sophisticated apartment residences and stylish amenities in one of L.A.’s most energetic locations. From beachside to cityside or poolside to fireside, this is where lifestyle and location are in perfect alignment.",
  features: [
    "Live Music Cocerts at Luviana",
    "Our SecretIsland Boat Tour is Just for You",
    "publishing packages and web page editors",
    "Nemo enim ipsam voluptatem quia voluptas",
    "Exploring the Wonders of the Amazon Rainforest",
  ],
  icon: settingIcon,
  years: "25",
  expPara: "Years of Experience",
};

export const companyState = [
  {
    metric: "Completed Projects",
    value: "1800",
  },
  {
    metric: "Experts Worker",
    value: "150",
  },
  {
    metric: "Clients Are Happy",
    value: "1200",
  },
  {
    metric: "Award Winning",
    value: "126",
  },
];

import Client1 from "../assets/images/clients/c1.jpg";
import Client2 from "../assets/images/clients/c2.jpg";
import Client3 from "../assets/images/clients/c3.jpg";
import Client4 from "../assets/images/clients/c4.jpg";
import Client5 from "../assets/images/clients/c5.jpg";

export const ClientsFeedback = {
  title: "Testimonials",
  paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  feedback: [
    {
      name: "Marcus Vance",
      company: "Nova Retail Group",
      role: "VP of E-commerce",
      avatar_url: Client1,
      testimonial:
        "Our checkout conversion rates increased by 15% after implementing this integration. The analytics dashboard provides exactly the insights we needed to optimize our funnel.",
    },
    {
      name: "Elena Rostova",
      company: "BioHealth Global",
      role: "Head of Research",
      avatar_url: Client2,
      testimonial:
        "Data security is paramount for our clinical trials, and this platform exceeds all our compliance standards while keeping the user experience incredibly simple.",
    },
    {
      name: "Devon Lane",
      company: "CloudScale Solutions",
      role: "Principal DevOps Engineer",
      avatar_url: Client3,
      testimonial:
        "The automated scaling handles our peak traffic spikes without a single hitch. It's the most reliable infrastructure piece we’ve adopted this year.",
    },
    {
      name: "Amara Okafor",
      company: "TalentHive",
      role: "Director of People & Culture",
      avatar_url: Client4,
      testimonial:
        "Managing a remote, global team used to be an administrative nightmare. This software centralizes everything beautifully, from payroll to milestone tracking.",
    },
    {
      name: "Liam Zhao",
      company: "GreenGrid Energy",
      role: "Sustainability Analyst",
      avatar_url: Client5,
      testimonial:
        "The reporting tools saved us hours of manual spreadsheet work. We can now generate investor-ready environmental impact reports with a single click.",
    },
  ],
};
