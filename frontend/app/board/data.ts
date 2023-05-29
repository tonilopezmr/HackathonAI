export type cardData = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
};

const data: cardData[] = [
  {
    id: 12,
    title: 'Creación de Campañas',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/2987/2987996.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 13,
    title: 'Otro use case',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/10037/10037283.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 14,
    title: 'Otro use case',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/8215/8215216.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 15,
    title: 'Otro use case',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/9669/9669669.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default data;
