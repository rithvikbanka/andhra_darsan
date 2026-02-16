// LocalStorage utility for Andhra Darsan admin panel
// Manages experiences data persistence

const EXPERIENCES_KEY = 'andhra_darsan_experiences';

// Generate URL-friendly slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Initialize with DEMO_EXPERIENCES if localStorage is empty
export const initializeExperiences = (demoData) => {
  const existing = localStorage.getItem(EXPERIENCES_KEY);
  if (!existing) {
    // Ensure all demo data has slugs
    const dataWithSlugs = demoData.map(exp => ({
      ...exp,
      slug: exp.slug || generateSlug(exp.title)
    }));
    localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(dataWithSlugs));
    return dataWithSlugs;
  }
  return JSON.parse(existing);
};

// Get all experiences
export const getExperiences = () => {
  const data = localStorage.getItem(EXPERIENCES_KEY);
  return data ? JSON.parse(data) : [];
};

// Get single experience by slug
export const getExperienceBySlug = (slug) => {
  const experiences = getExperiences();
  return experiences.find(exp => exp.slug === slug);
};

// Get single experience by ID (fallback for compatibility)
export const getExperienceById = (id) => {
  const experiences = getExperiences();
  return experiences.find(exp => exp.id === parseInt(id));
};

// Save/update experience
export const saveExperience = (experience) => {
  const experiences = getExperiences();
  
  if (experience.id) {
    // Update existing
    const index = experiences.findIndex(exp => exp.id === experience.id);
    if (index !== -1) {
      // Regenerate slug if title changed
      const updatedExp = {
        ...experience,
        slug: generateSlug(experience.title)
      };
      experiences[index] = updatedExp;
      localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(experiences));
      return updatedExp;
    }
  } else {
    // Add new (generate new ID)
    const maxId = Math.max(0, ...experiences.map(e => e.id || 0));
    const newExp = {
      ...experience,
      id: maxId + 1,
      slug: generateSlug(experience.title)
    };
    experiences.push(newExp);
    localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(experiences));
    return newExp;
  }
  
  return experience;
};

// Delete experience
export const deleteExperience = (id) => {
  const experiences = getExperiences();
  const filtered = experiences.filter(exp => exp.id !== id);
  localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(filtered));
  return filtered;
};

// Get statistics for admin dashboard
export const getExperienceStats = () => {
  const experiences = getExperiences();
  return {
    total: experiences.length,
    featured: experiences.filter(exp => exp.featured).length,
    byCategory: experiences.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + 1;
      return acc;
    }, {})
  };
};
