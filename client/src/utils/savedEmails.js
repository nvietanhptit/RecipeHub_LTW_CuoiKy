import { SAVED_EMAILS_KEY } from "./constants";

const MAX_SAVED_EMAILS = 5;

export const getSavedEmails = () => {
  try {
    const raw = localStorage.getItem(SAVED_EMAILS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

export const saveEmail = (email) => {
  const trimmed = email.trim();
  const next = [
    trimmed,
    ...getSavedEmails().filter((item) => item !== trimmed),
  ].slice(0, MAX_SAVED_EMAILS);

  localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(next));
};
