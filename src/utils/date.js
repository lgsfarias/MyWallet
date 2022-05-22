export const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

export const years = new Array(3)
    .fill(new Date().getFullYear())
    .map((elem, index) => elem - index);
