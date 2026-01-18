/**
 * Shared constants used across the application
 */

// Vietnamese month names
export const MONTH_NAMES = [
  'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư',
  'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
  'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'
];

// Day names (abbreviated)
export const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

// Date formatting options for Vietnamese locale
export const DATE_FORMAT_OPTIONS = {
  time: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  },
  dateLong: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
};

// Vietnamese locale
export const LOCALE = 'vi-VN';
