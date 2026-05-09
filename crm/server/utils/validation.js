export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;
  const invalidDomains = ['tempmail', '10minutemail', 'throwaway', 'trashmail', 'mailinator'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (invalidDomains.some(d => domain.includes(d))) return false;
  return true;
};

export const isValidPassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
};

export const isValidName = (name) => {
  if (!name || name.trim().length < 3) return false;
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(name)) return false;
  const genericNames = ['user', 'test', 'admin', 'abc', 'demo', 'dummy', 'staff'];
  if (genericNames.includes(name.trim().toLowerCase())) return false;
  return true;
};
