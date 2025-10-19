// src/app/data/tarot-cards.ts

export interface Card {
  id: number;
  name: string;
  roman: string;
  image: string;
  description: string;
}

export const TAROT_CARDS: Card[] = [
  {
    id: 0,
    name: 'Louco',
    roman: '0',
    image: 'louco.png', // <-- MUDANÇA PARA .png
    description: 'Novos inícios, inocência, espontaneidade, livre-espírito.',
  },
  {
    id: 1,
    name: 'Mago',
    roman: 'I',
    image: 'mago.png', // <-- MUDANÇA PARA .png
    description: 'Poder, habilidade, concentração, ação, recursos.',
  },
  {
    id: 2,
    name: 'Sacerdotisa',
    roman: 'II',
    image: 'sacerdotisa.png', // <-- MUDANÇA PARA .png
    description: 'Intuição, mistério, inconsciente, sabedoria interior.',
  },
  {
    id: 3,
    name: 'Imperatriz',
    roman: 'III',
    image: 'imperatriz.png', // <-- MUDANÇA PARA .png
    description: 'Feminilidade, beleza, natureza, abundância, maternidade.',
  },
  {
    id: 4,
    name: 'Imperador',
    roman: 'IV',
    image: 'imperador.png', // <-- MUDANÇA PARA .png (Nome de arquivo "emperador.png" na sua pasta parece ser erro de digitação, usei o correto aqui)
    description: 'Autoridade, estrutura, controle, paternidade.',
  },
  {
    id: 5,
    name: 'Hierofante',
    roman: 'V',
    image: 'hierofante.png', // <-- MUDANÇA PARA .png
    description: 'Tradição, conformidade, moralidade, crenças.',
  },
  {
    id: 6,
    name: 'Enamorados',
    roman: 'VI',
    image: 'enamorados.png', // <-- MUDANÇA PARA .png
    description: 'União, parceria, escolha, alinhamento de valores.',
  },
  {
    id: 7,
    name: 'Carro',
    roman: 'VII',
    image: 'carro.png', // <-- MUDANÇA PARA .png
    description: 'Vitória, força de vontade, movimento, autocontrole.',
  },
  {
    id: 8,
    name: 'Justiça',
    roman: 'VIII',
    image: 'justica.png', // <-- MUDANÇA PARA .png
    description: 'Justiça, equidade, verdade, causa e efeito, legalidade.',
  },
  {
    id: 9,
    name: 'Eremita',
    roman: 'IX',
    image: 'eremita.png', // <-- MUDANÇA PARA .png
    description: 'Solidão, introspecção, busca interior, guia, prudência.',
  },
  {
    id: 10,
    name: 'Roda da Fortuna',
    roman: 'X',
    image: 'roda_da_fortuna.png', // <-- MUDANÇA PARA .png (e '_' se seus arquivos tiverem)
    description: 'Mudança de sorte, ciclos, destino, acaso.',
  },
  {
    id: 11,
    name: 'Força',
    roman: 'XI',
    image: 'forca.png', // <-- MUDANÇA PARA .png
    description: 'Força interior, coragem, paciência, compaixão.',
  },
  {
    id: 12,
    name: 'Pendurado',
    roman: 'XII',
    image: 'pendurado.png', // <-- MUDANÇA PARA .png
    description: 'Sacrifício, nova perspectiva, suspensão, rendição.',
  },
  {
    id: 13,
    name: 'Morte',
    roman: 'XIII',
    image: 'morte.png', // <-- MUDANÇA PARA .png
    description: 'Fim de um ciclo, transformação, renovação, transição.',
  },
  {
    id: 14,
    name: 'Temperança',
    roman: 'XIV',
    image: 'temperanca.png', // <-- MUDANÇA PARA .png
    description: 'Moderação, equilíbrio, harmonia, paciência, propósito.',
  },
  {
    id: 15,
    name: 'Diabo',
    roman: 'XV',
    image: 'diabo.png', // <-- MUDANÇA PARA .png
    description: 'Escravidão, vício, materialismo, sombra, tentação.',
  },
  {
    id: 16,
    name: 'Torre',
    roman: 'XVI',
    image: 'torre.png', // <-- MUDANÇA PARA .png
    description: 'Colapso, mudança súbita, revelação, caos.',
  },
  {
    id: 17,
    name: 'Estrela',
    roman: 'XVII',
    image: 'estrela.png', // <-- MUDANÇA PARA .png
    description: 'Esperança, fé, inspiração, renovação espiritual.',
  },
  {
    id: 18,
    name: 'Lua',
    roman: 'XVIII',
    image: 'lua.png', // <-- MUDANÇA PARA .png
    description: 'Ilusão, medo, ansiedade, subconsciente, intuição.',
  },
  {
    id: 19,
    name: 'Sol',
    roman: 'XIX',
    image: 'sol.png', // <-- MUDANÇA PARA .png
    description: 'Sucesso, alegria, vitalidade, celebração, otimismo.',
  },
  {
    id: 20,
    name: 'Julgamento',
    roman: 'XX',
    image: 'julgamento.png', // <-- MUDANÇA PARA .png
    description: 'Avaliação, despertar, perdão, renovação, segunda chance.',
  },
  {
    id: 21,
    name: 'Mundo',
    roman: 'XXI',
    image: 'mundo.png', // <-- MUDANÇA PARA .png
    description: 'Realização, conclusão, totalidade, viagem, sucesso.',
  },
];