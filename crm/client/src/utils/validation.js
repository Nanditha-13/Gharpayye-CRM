export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;
  const invalidDomains = ['tempmail', '10minutemail', 'throwaway', 'trashmail', 'mailinator'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (invalidDomains.some(d => domain.includes(d))) return false;
  return true;
};

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push('Minimum 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('1 uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('1 lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('1 number');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('1 special character');
  
  return { isValid: errors.length === 0, errors, score: (5 - errors.length) * 20 };
};

export const isValidName = (name) => {
  if (!name || name.trim().length < 3) return { isValid: false, error: 'Minimum 3 characters required' };
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(name)) return { isValid: false, error: 'Only alphabets and spaces allowed' };
  const genericNames = ['user', 'test', 'admin', 'abc', 'demo', 'dummy', 'staff'];
  if (genericNames.includes(name.trim().toLowerCase())) return { isValid: false, error: 'Please use your real name' };
  return { isValid: true };
};
