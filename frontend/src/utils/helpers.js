// Utility functions for Andhra Darsan frontend

/**
 * Smooth scroll to top of page
 * @param {number} delay - Optional delay in milliseconds before scrolling
 */
export const scrollToTop = (delay = 0) => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, delay);
};

/**
 * Scroll to a specific element by ID
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} delay - Optional delay in milliseconds before scrolling
 */
export const scrollToElement = (elementId, delay = 100) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, delay);
};

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format phone number for tel: link
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneForTel = (phone) => {
  return phone.replace(/\s+/g, '');
};

/**
 * Safely access localStorage with error handling
 * @param {string} key - localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Value from localStorage or default
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

/**
 * Safely set localStorage with error handling
 * @param {string} key - localStorage key
 * @param {any} value - Value to store
 * @returns {boolean} True if successful
 */
export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
    return false;
  }
};
