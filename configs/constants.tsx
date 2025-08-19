import { Dimensions, Image } from "react-native";
import { IsIPAD } from "@/themes/app.constant"
import { verticalScale } from "react-native-size-matters";
//@ts-ignore
import One from "@/assets/images/onboarding/1.png"
//@ts-ignore
import Two from "@/assets/images/onboarding/2.png"
//@ts-ignore
import Three from "@/assets/images/onboarding/3.png"
export const onBoardingSlides: onBoardingSlidesTypes[] = [
  {
    color: '#FF6347',
    image: (<Image source={One}
      style={{
        width: IsIPAD ? verticalScale(285) : verticalScale(320),
        height: IsIPAD ? verticalScale(345) : verticalScale(330),
      }} />),
    title: 'Welcome to LMS',
    secondTitle: 'Learn Anytime, Anywhere',
    subTitle: 'Join our community of learners and start your journey today!'
  },
  {
    color: '#4682B4',
    image: (<Image source={Two}
      style={{
        width: IsIPAD ? verticalScale(285) : verticalScale(320),
        height: IsIPAD ? verticalScale(345) : verticalScale(330),
      }} />),
    title: 'Explore Courses',
    secondTitle: 'Diverse Learning Paths',
    subTitle: 'Choose from a wide range of courses tailored to your interests.'
  },
  {
    color: '#32CD32',
    image: (<Image source={Three}
      style={{
        width: IsIPAD ? verticalScale(285) : verticalScale(320),
        height: IsIPAD ? verticalScale(345) : verticalScale(330),
      }} />),
    title: 'Track Your Progress',
    secondTitle: 'Stay Motivated',
    subTitle: 'Monitor your learning journey and achieve your goals.'
  }
] 


// onboarding variable

export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0
export const LEFT_SNAP_POINT = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINT = [NEXT, WIDTH - MARGIN_WIDTH];


// Enum

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export const bannerData = [
  {
    image:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1731710065/Let_s-build-a-production-ready-LMS-Mobile-App-with-Expo-React-Native_ahqpvx.png",
    url: "https://youtu.be/0sfVmH5_nj4",
  },
  {
    image:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574008/WhatsApp_Image_2024-02-29_at_2.00.10_AM_zpk4qe.jpg",
    url: "https://youtu.be/BrrwtCt7d-Y",
  },
  {
    image:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1723424082/WhatsApp_Image_2024-08-09_at_5.00.52_AM_wzokd1.jpg",
    url: "https://youtu.be/4aS7g8OYHbg",
  },
];

export const videoLessonsData = [
  // Curated list of popular, stable tutorial videos (high likelihood of availability)
  {
    url: 'https://youtu.be/0-S5a0eXPoc',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/hqdefault.jpg',
    title: 'React Native Crash Course (Mosh)',
  },
  {
    url: 'https://youtu.be/wm5gMKuwSYk',
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg',
    title: 'Next.js Full Stack App (JavaScript Mastery)',
  },
  {
    url: 'https://youtu.be/BwuLxPH8IDs',
    thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg',
    title: 'TypeScript for Beginners (freeCodeCamp)',
  },
  {
    url: 'https://youtu.be/Ke90Tje7VS0',
    thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg',
    title: 'React JS Fundamentals (Facebook Dev)',
  },
  {
    url: 'https://youtu.be/fBNz5xF-Kx4',
    thumbnail: 'https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg',
    title: 'Node.js & Express Crash Course (Traversy)',
  },
  {
    url: 'https://youtu.be/Oe421EPjeBE',
    thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg',
    title: 'Prisma ORM Crash Course (Traversy)',
  },
  {
    url: 'https://youtu.be/w7ejDZ8SWv8',
    thumbnail: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg',
    title: 'React JS Crash Course (Traversy)',
  },
  {
    url: 'https://youtu.be/dFgzHOX84xQ',
    thumbnail: 'https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg',
    title: 'Tailwind CSS Crash Course (Traversy)',
  },
  {
    url: 'https://youtu.be/fqMOX6JJhGo',
    thumbnail: 'https://i.ytimg.com/vi/fqMOX6JJhGo/hqdefault.jpg',
    title: 'Docker Crash Course (Traversy)',
  },
];

export const NotificationsData = [
  {
    id: "1",
    title: "New Answer Received",
    message: "You have a new answer in your question",
    status: "Unread",
  },
  {
    id: "2",
    title: "New Reply Received",
    message: "You have a new reply in your support question",
    status: "Unread",
  },
  {
    id: "3",
    title: "New Comment Received",
    message: "You have a new comment on your post",
    status: "Unread",
  },
  {
    id: "4",
    title: "New Course Available",
    message: "A new course has been added to your library",
    status: "Read",
  },
  {
    id: "5",
    title: "Course Update",
    message: "Your enrolled course has been updated with new content",
    status: "Read",
  },
  {
    id: "6",
    title: "New Feature Released",
    message: "Check out the new features in the app!",
    status: "Read",
  },
  {
    id: "7",
    title: "Maintenance Notification",
    message: "The app will be down for maintenance on Sunday",
    status: "Read",
  },
  {
    id: "8",
    title: "New Comment on Your Post",
    message: "Someone commented on your post",
    status: "Unread",
  },
  {
    id: "9",
    title: "New Like on Your Post",
    message: "Your post received a new like",
    status: "Unread",
  },
];


export const FAQData = [
  {
    id: 1,
    question: "Will I receive a certificate for each course?",
    answer:
      "Yes — each student who completes any course will receive a certificate of completion to acknowledge their proficiency. We encourage students to include these on their LinkedIn profiles and in their job applications!",
  },
  {
    id: 2,
    question: "Can I get source code of each course?",
    answer:
      "Yes - You will get source code of all courses when you will watch the course video.",
  },
  {
    id: 3,
    question:
      "Can I ask about anything related course or if my code dosen't work?",
    answer:
      "Yes, you can comment on every part of the videos in the course. We'll always try to reply to your comment and fix any issues you may have.",
  },
  {
    id: 4,
    question: "Can I download any course videos?",
    answer:
      "For security reasons, course videos cannot be downloaded. However, you have lifetime access to each purchased course and can watch them anytime, anywhere with your account",
  },
];

export const staticTickets: TicketsTypes[] = [
    {
      id: "1",
      creatorId: "user1",
      ticketTitle: "Unable to access course videos",
      reply: [],
      details: "I'm having trouble accessing the video content in my enrolled course. The videos won't load properly.",
      status: "Pending",
      createdAt: new Date("2024-08-05"),
      updatedAt: new Date("2024-08-05"),
    },
    {
      id: "2",
      creatorId: "user1",
      ticketTitle: "Payment issue with course enrollment",
      reply: [],
      details: "My payment was deducted but I haven't received access to the course. Please help resolve this issue.",
      status: "Closed",
      createdAt: new Date("2024-08-03"),
      updatedAt: new Date("2024-08-04"),
    },
    {
      id: "3",
      creatorId: "user1",
      ticketTitle: "App crashes when opening assignments",
      reply: [],
      details: "The mobile app crashes every time I try to open the assignments section. This is affecting my learning progress.",
      status: "Pending",
      createdAt: new Date("2024-08-06"),
      updatedAt: new Date("2024-08-06"),
    },
    {
      id: "4",
      creatorId: "user1",
      ticketTitle: "Certificate download not working",
      reply: [],
      details: "I completed the course but unable to download the completion certificate. The download button is not responding.",
      status: "Closed",
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-08-02"),
    },
    {
      id: "5",
      creatorId: "user1",
      ticketTitle: "Quiz submission failed",
      reply: [],
      details: "My quiz answers were not submitted properly and now it shows as incomplete. I need this to be corrected.",
      status: "Pending",
      createdAt: new Date("2024-08-07"),
      updatedAt: new Date("2024-08-07"),
    },
  ];

  // Tech YouTube Playlists for CoursesData
export const CoursesData = [
  {
    title: 'JavaScript Tutorials by Net Ninja',
    url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU',
    description: 'Modern JavaScript explained from the ground up.',
    thumbnail: 'https://i.ytimg.com/vi/qoSksQ4s_hg/hqdefault.jpg'
  },
  {
    title: 'Node.js Tutorial for Beginners (Codevolution)',
    url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3',
    description: 'Node.js from basics to advanced with real projects.',
    thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg'
  },
  {
    title: 'TypeScript Tutorial for Beginners',
    url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9i0_2FF-WhtRIfIJ1lXlTZR',
    description: 'TypeScript fundamentals and advanced concepts by Net Ninja.',
    thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg'
  },
  {
    title: 'Next.js Tutorials (JavaScript Mastery)',
    url: 'https://www.youtube.com/playlist?list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu',
    description: 'Build full stack apps with Next.js.',
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg'
  },
  {
    title: 'React Native - The Practical Guide',
    url: 'https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q',
    description: 'A comprehensive React Native playlist by Academind.',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/hqdefault.jpg'
  },
  {
    title: 'Docker for Beginners (TechWorld with Nana)',
    url: 'https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC',
    description: 'Learn Docker from scratch with practical demos.',
    thumbnail: 'https://i.ytimg.com/vi/3c-iBn73dDE/hqdefault.jpg'
  }
];