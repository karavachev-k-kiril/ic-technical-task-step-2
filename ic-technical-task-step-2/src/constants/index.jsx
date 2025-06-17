export const API_URL = 'https://motointegrator.com/api/search/v4/workshop';

export const COUNTRIES = [
  { name: 'Poland', code: 'PL' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Bosnia And Herzegovina', code: 'BA' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Romania', code: 'RO' },
  { name: 'Slovakia', code: 'SK' },
];

export const OPEN_HOURS_OPTIONS = [
    { name: 'Any', value: '-' },
    { name: 'Open now', value: 'OPEN_NOW' },
    { name: 'Open 24H', value: 'OPEN_24H' },
    { name: 'Open after 18:00', value: 'OPEN_AFTER_18' },
    { name: 'Open on weekends', value: 'OPEN_ON_WEEKENDS' },
];