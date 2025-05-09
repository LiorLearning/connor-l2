// Create notification function (copied locally to avoid import issues)
function createFeedbackNotification(message, options = {}) {
  const defaults = {
    position: 'center', // center, top, bottom
    color: '#00ffff',
    fontSize: '24px',
    duration: 2000,
    backgroundColor: 'transparent'
  };
  
  const settings = { ...defaults, ...options };
  
  const notification = document.createElement('div');
  Object.assign(notification.style, {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Orbitron', sans-serif, Arial, Helvetica",
    fontSize: settings.fontSize,
    color: settings.color,
    textShadow: `0 0 10px ${settings.color}`,
    zIndex: '100',
    opacity: '0',
    transition: 'opacity 0.3s',
    textAlign: 'center',
    backgroundColor: settings.backgroundColor,
    padding: settings.backgroundColor !== 'transparent' ? '10px 20px' : '0',
    borderRadius: '5px'
  });
  
  // Set vertical position
  if (settings.position === 'top') {
    notification.style.top = '20%';
  } else if (settings.position === 'bottom') {
    notification.style.top = '80%';
  } else {
    notification.style.top = '50%';
  }
  
  notification.innerHTML = message;
  document.getElementById('renderDiv').appendChild(notification);
  
  setTimeout(() => { 
    notification.style.opacity = '1';
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          document.getElementById('renderDiv').removeChild(notification);
        }
      }, 300);
    }, settings.duration);
  }, 10);
  
  return notification;
}

// Show feedback form when game is over
export function showFeedbackForm(onSubmit) {
  // Create the feedback container
  const feedbackContainer = document.createElement('div');
  feedbackContainer.id = 'feedbackContainer';
  Object.assign(feedbackContainer.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    backgroundColor: 'rgba(0, 10, 20, 0.95)',
    borderRadius: '10px',
    border: '2px solid #00ffff',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    padding: '20px',
    zIndex: '1000',
    fontFamily: "'Orbitron', sans-serif",
    color: '#ffffff',
    textAlign: 'center'
  });
  
  // Add title
  const title = document.createElement('h2');
  title.textContent = 'Create Game';
  Object.assign(title.style, {
    color: '#00ffff',
    marginTop: '0',
    fontSize: '24px',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  });
  feedbackContainer.appendChild(title);
  
  // Add subtitle
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Design your own game';
  Object.assign(subtitle.style, {
    color: '#aaffff',
    fontSize: '16px',
    marginBottom: '20px'
  });
  feedbackContainer.appendChild(subtitle);
  
  // Create form
  const form = document.createElement('form');
  Object.assign(form.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'left'
  });
  
  // Create feedback categories with text inputs
  const categories = [
    { id: 'hero', label: 'Hero Character' },
    { id: 'villain', label: 'Villain Character' },
    { id: 'gameplay', label: 'Gameplay' },
    { id: 'setting', label: 'Game Setting' },
    { id: 'mathTopic', label: 'Math Challenge' }
  ];
  
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    Object.assign(categoryContainer.style, {
      width: '100%',
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column'
    });
    
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = `${category.label}:`;
    Object.assign(categoryLabel.style, {
      fontSize: '16px',
      marginBottom: '5px'
    });
    categoryContainer.appendChild(categoryLabel);
    
    // Create text input field instead of ratings
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.id = category.id;
    textInput.name = category.id;
    textInput.placeholder = `Design your own ${category.label.toLowerCase()}...`;
    Object.assign(textInput.style, {
      width: '100%',
      padding: '8px',
      fontSize: '14px',
      backgroundColor: 'rgba(0, 50, 80, 0.8)',
      border: '2px solid #0088aa',
      borderRadius: '5px',
      color: 'white',
      boxSizing: 'border-box',
      outline: 'none'
    });
    
    // Add focus styles
    textInput.addEventListener('focus', () => {
      textInput.style.borderColor = '#00ffff';
      textInput.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.5)';
    });
    
    textInput.addEventListener('blur', () => {
      textInput.style.borderColor = '#0088aa';
      textInput.style.boxShadow = 'none';
    });
    
    categoryContainer.appendChild(textInput);
    form.appendChild(categoryContainer);
  });
  
  // Add contact info field
  const contactContainer = document.createElement('div');
  Object.assign(contactContainer.style, {
    width: '100%',
    marginTop: '10px'
  });
  
  const contactLabel = document.createElement('label');
  contactLabel.htmlFor = 'contactInfo';
  contactLabel.textContent = 'Contact Info (optional):';
  Object.assign(contactLabel.style, {
    fontSize: '16px',
    marginBottom: '5px',
    display: 'block'
  });
  contactContainer.appendChild(contactLabel);
  
  const contactInput = document.createElement('input');
  contactInput.type = 'text';
  contactInput.id = 'contactInfo';
  contactInput.placeholder = 'Email or Phone (optional)';
  Object.assign(contactInput.style, {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'rgba(0, 50, 80, 0.8)',
    border: '2px solid #0088aa',
    borderRadius: '5px',
    color: 'white',
    boxSizing: 'border-box',
    outline: 'none'
  });
  
  // Add focus styles
  contactInput.addEventListener('focus', () => {
    contactInput.style.borderColor = '#00ffff';
    contactInput.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.5)';
  });
  
  contactInput.addEventListener('blur', () => {
    contactInput.style.borderColor = '#0088aa';
    contactInput.style.boxShadow = 'none';
  });
  
  contactContainer.appendChild(contactInput);
  form.appendChild(contactContainer);
  
  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit Game';
  Object.assign(submitButton.style, {
    backgroundColor: 'rgba(0, 100, 150, 0.8)',
    border: '2px solid #00ffff',
    borderRadius: '5px',
    padding: '12px 24px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'all 0.2s'
  });
  
  submitButton.addEventListener('mouseover', () => {
    submitButton.style.backgroundColor = 'rgba(0, 130, 180, 0.8)';
  });
  
  submitButton.addEventListener('mouseout', () => {
    submitButton.style.backgroundColor = 'rgba(0, 100, 150, 0.8)';
  });
  
  form.appendChild(submitButton);
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect data from form
    const feedbackData = {
      hero: form.querySelector('#hero').value || "No feedback provided",
      villain: form.querySelector('#villain').value || "No feedback provided",
      gameplay: form.querySelector('#gameplay').value || "No feedback provided",
      setting: form.querySelector('#setting').value || "No feedback provided",
      mathTopic: form.querySelector('#mathTopic').value || "No feedback provided",
      contactInfo: contactInput.value || ""
    };
    
    // Remove form from screen
    feedbackContainer.parentNode.removeChild(feedbackContainer);
    
    // Show thank you message
    createFeedbackNotification(
      'Thank you for your feedback!',
      { 
        color: '#00ffaa',
        fontSize: '24px',
        duration: 2000
      }
    );
    
    // Call the callback with the data
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(feedbackData);
    }
  });
  
  feedbackContainer.appendChild(form);
  document.getElementById('renderDiv').appendChild(feedbackContainer);
}