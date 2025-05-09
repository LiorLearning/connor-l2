// Create notification function (copied from interface.js to avoid import issues)
function createLoginNotification(message, options = {}) {
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

// Show user login form before starting the game
export function showUserLoginForm(onSubmit) {
  console.log('Creating user login form');
  
  // Add Google Font Link if not already present
  if (!document.querySelector('link[href*="Orbitron"]')) {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    console.log('Added Orbitron font link');
  }

  // Create the login container
  const loginContainer = document.createElement('div');
  loginContainer.id = 'loginContainer';
  Object.assign(loginContainer.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'rgba(0, 10, 20, 0.95)',
    borderRadius: '10px',
    border: '2px solid #00ffff',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    padding: '20px',
    zIndex: '1000',
    fontFamily: "'Orbitron', sans-serif, Arial, Helvetica",
    color: '#ffffff',
    textAlign: 'center'
  });
  
  // Add title
  const title = document.createElement('h2');
  title.textContent = 'Welcome to Lightning Bolt vs Smoke';
  Object.assign(title.style, {
    color: '#00ffff',
    marginTop: '0',
    fontSize: '24px',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  });
  loginContainer.appendChild(title);
  
  // Add subtitle
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Please enter your name to begin!';
  Object.assign(subtitle.style, {
    color: '#aaffff',
    fontSize: '16px',
    marginBottom: '20px'
  });
  loginContainer.appendChild(subtitle);
  
  // Create form
  const form = document.createElement('form');
  Object.assign(form.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  });
  
  // Create input field
  const inputContainer = document.createElement('div');
  Object.assign(inputContainer.style, {
    width: '100%'
  });
  
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'userNameInput';
  nameInput.placeholder = 'Your Name';
  nameInput.required = true;
  Object.assign(nameInput.style, {
    width: '90%',
    padding: '12px',
    fontSize: '18px',
    backgroundColor: 'rgba(0, 50, 80, 0.8)',
    border: '2px solid #0088aa',
    borderRadius: '5px',
    color: 'white',
    outline: 'none'
  });
  
  // Add focus styles
  nameInput.addEventListener('focus', () => {
    nameInput.style.borderColor = '#00ffff';
    nameInput.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.5)';
  });
  
  nameInput.addEventListener('blur', () => {
    nameInput.style.borderColor = '#0088aa';
    nameInput.style.boxShadow = 'none';
  });
  
  inputContainer.appendChild(nameInput);
  form.appendChild(inputContainer);
  
  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Start Game';
  Object.assign(submitButton.style, {
    backgroundColor: 'rgba(0, 100, 150, 0.8)',
    border: '2px solid #00ffff',
    borderRadius: '5px',
    padding: '12px 24px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    margin: '10px auto',
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
    const userName = nameInput.value.trim();
    
    if (userName) {
      // Call the onSubmit callback with the username
      onSubmit(userName);
      
      // Remove login container
      try {
        if (loginContainer.parentNode) {
          loginContainer.parentNode.removeChild(loginContainer);
        }
      } catch (e) {
        console.error('Error removing login container:', e);
      }
      
      // Show welcome notification
      createLoginNotification(
        `Welcome, ${userName}!`,
        { color: '#00ffff', duration: 2000 }
      );
    }
  });
  
  loginContainer.appendChild(form);
  
  // Add the login container to the DOM
  const renderDiv = document.getElementById('renderDiv');
  if (renderDiv) {
    console.log('Adding login container to renderDiv');
    renderDiv.appendChild(loginContainer);
  } else {
    console.error('renderDiv element not found in the DOM');
    // Fallback to body if renderDiv not found
    document.body.appendChild(loginContainer);
    console.log('Added login container to body instead');
  }
}