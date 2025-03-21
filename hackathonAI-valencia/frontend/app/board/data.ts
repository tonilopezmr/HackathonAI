export type cardData = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
};

const data: cardData[] = [
  {
    id: 12,
    title: 'Blog Posts',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/2987/2987996.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 13,
    title: 'PDF',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/10037/10037283.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export default data;
