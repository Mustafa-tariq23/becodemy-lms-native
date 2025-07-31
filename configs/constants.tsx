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