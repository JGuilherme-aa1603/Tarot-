export interface Card {
  id: number;
  name: string;
  roman: string;
  image: string; // Caminho da imagem dentro de assets/images/tarot/
  description: string;
}

export const TAROT_CARDS: Card[] = [
  {
    id: 0,
    name: 'O Louco',
    roman: '0',
    image: 'o-louco.jpg',
    description: 'Novos inícios, inocência, espontaneidade, livre-espírito.',
  },
  {
    id: 1,
    name: 'O Mago',
    roman: 'I',
    image: 'o-mago.jpg',
    description: 'Poder, habilidade, concentração, ação, recursos.',
  },
  {
    id: 2,
    name: 'A Sacerdotisa',
    roman: 'II',
    image: 'a-sacerdotisa.jpg',
    description: 'Intuição, mistério, inconsciente, sabedoria interior.',
  },
  {
    id: 3,
    name: 'A Imperatriz',
    roman: 'III',
    image: 'a-imperatriz.jpg',
    description: 'Feminilidade, beleza, natureza, abundância, maternidade.',
  },
  {
    id: 4,
    name: 'O Imperador',
    roman: 'IV',
    image: 'o-imperador.jpg',
    description: 'Autoridade, estrutura, controle, paternidade.',
  },
  {
    id: 5,
    name: 'O Hierofante',
    roman: 'V',
    image: 'o-hierofante.jpg',
    description: 'Tradição, conformidade, moralidade, crenças.',
  },
  // Você adicionaria o restante das 78 cartas aqui
];