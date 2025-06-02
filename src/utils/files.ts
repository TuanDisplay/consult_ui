import { MajorCat } from '~/common/data';
import DOMPurify from 'dompurify';

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertCategoryName = (catValue?: string) => {
  const categoryName = MajorCat.find((item) => item.value === catValue)?.name;
  return categoryName;
};

export const convertIsoDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatted;
};

export const convertIsoDateTime = (isoDateTime: string) => {
  const date = new Date(isoDateTime);
  const formatted = date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formatted;
};

export const convertCurrencyVN = (price?: number) => {
  const formatted = price?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatted;
};

export const convertPartName = (words: string) => {
  const wordArr = words.trim().split(/\s+/);
  if (wordArr.length >= 2) return wordArr.slice(-2).join(' ');
  return wordArr[0];
};

export const convertHtmlToText = (htmlString: string) => {
  const parsed = new DOMParser().parseFromString(htmlString, 'text/html');
  const plainText = parsed.body.textContent || '';
  return plainText;
};

export const convertStringToHtml = (htmlString?: string) => {
  if (!htmlString) return;
  const cleanHtml = DOMPurify.sanitize(htmlString);
  return { __html: cleanHtml };
};
