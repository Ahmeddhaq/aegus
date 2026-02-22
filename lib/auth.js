




const API_BASE = '/api';




async function register(email, password, fullName) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        email,
        password,
        fullName,
      }),
    });

    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      console.error('Raw response:', text);
      throw {
        status: response.status,
        code: 'SERVER_ERROR',
        message: `Server error (${response.status}). Backend may have crashed. Check the terminal where the server is running.`,
      };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        code: data.code,
        message: data.error,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
}




async function signIn(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw {
        status: response.status,
        code: 'SERVER_ERROR',
        message: `Server error (${response.status}). Check if backend is running.`,
      };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        code: data.code,
        message: data.error,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
}




async function signOut() {
  try {
    const response = await fetch(`${API_BASE}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw {
        status: response.status,
        code: 'SERVER_ERROR',
        message: `Server error (${response.status})`,
      };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        code: data.code,
        message: data.error,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
}




async function checkAuth() {
  try {
    const response = await fetch(`${API_BASE}/auth/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    return data.user;
  } catch (error) {
    return null;
  }
}





async function signInWithGoogle() {
  try {
    
    window.location.href = `${API_BASE}/auth/google`;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}




function showError(message, type = 'error') {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.className = `alert alert-${type}`;
  }
}




function setLoading(element, isLoading) {
  if (isLoading) {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.textContent = 'Loading...';
  } else {
    element.disabled = false;
    element.textContent = element.dataset.originalText || 'Submit';
  }
}




function clearError() {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
  }
}


window.authModule = {
  register,
  signIn,
  signOut,
  checkAuth,
  signInWithGoogle,
  showError,
  setLoading,
  clearError,
};
