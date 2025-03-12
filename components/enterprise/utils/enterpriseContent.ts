import { ITabContent, IFollowshipItem } from '../interfaces';


export const getTabsContent = ( t: ( key: string ) => string ): ITabContent[] => [
  { title: t( 'followship_first_tab' ) },
  { title: t( 'followship_second_tab' ) },
  { title: t( 'followship_third_tab' ) }
];

export const getFollowshipContent = ( t: ( key: string ) => string ): IFollowshipItem[][] => [
  [ {
    id: 1,
    title: t( 'followship_first_title' ),
    description: t( 'followship_first_description' ),
    icon: {
      src: 'https://res.cloudinary.com/dobwqzgth/image/upload/v1736023716/zran1ut9kiio7ob5qg8m.webp',
      alt: 'Follow Team Icon'
    }
  } ],
  [ {
    id: 2,
    title: t( 'followship_second_title' ),
    description: t( 'followship_second_description' ),
    icon: {
      src: 'https://res.cloudinary.com/dobwqzgth/image/upload/v1736023831/y2ofg1konklv8p3nfcio.svg',
      alt: 'Curriculum Enterprise Icon'
    }
  } ],
  [ {
    id: 3,
    title: t( 'followship_third_title' ),
    description: t( 'followship_third_description' ),
    icon: {
      src: 'https://res.cloudinary.com/dobwqzgth/image/upload/v1736023862/zesk53k1jaaqp7cqkdsp.svg',
      alt: 'Tools Enterprise Icon'
    }
  } ]
];