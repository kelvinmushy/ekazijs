// utils.js

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  export const removeHtmlTags = (text) => {
    return text.replace(/<[^>]+>/g, '');
  };
  