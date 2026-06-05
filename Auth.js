export default function Auth({ onLogin }) {
  const container = document.createElement('div');
  container.className = 'auth-container';

  let mode = 'login'; // 'login' | 'register'
  let errorMsg = '';

  // Load user db from localStorage
  const getUsers = () => {
    try {
      const users = localStorage.getItem('minimalist-users');
      return users ? JSON.parse(users) : {};
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  // Save user db to localStorage
  const saveUser = (username, password) => {
    const users = getUsers();
    users[username.toLowerCase()] = {
      username, // Keep original casing for display
      password
    };
    localStorage.setItem('minimalist-users', JSON.stringify(users));
  };

  const render = () => {
    container.innerHTML = `
      <div class="auth-card">
        <header class="auth-header">
          <h2 class="auth-title">
            ${mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </h2>
          <p class="auth-subtitle">
            ${mode === 'login' ? 'Yapılacaklar listenize erişmek için oturum açın.' : 'Yeni bir hesap oluşturarak görevlerinizi yönetmeye başlayın.'}
          </p>
        </header>

        ${errorMsg ? `
          <div class="auth-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <span>${errorMsg}</span>
          </div>
        ` : ''}

        <form class="auth-form">
          <div class="form-group">
            <label class="form-label" for="username">Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              class="auth-input" 
              placeholder="kullanici_adi" 
              required 
              autocomplete="username"
              maxlength="20"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Şifre</label>
            <input 
              type="password" 
              id="password" 
              class="auth-input" 
              placeholder="••••••••" 
              required 
              autocomplete="current-password"
              maxlength="30"
            />
          </div>

          <button type="submit" class="auth-submit-btn">
            <span>${mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol ve Giriş Yap'}</span>
          </button>
        </form>

        <p class="auth-switch-text">
          ${mode === 'login' ? 'Hesabınız yok mu?' : 'Zaten üye misiniz?'}
          <button type="button" class="auth-switch-btn">
            ${mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    const form = container.querySelector('.auth-form');
    const switchBtn = container.querySelector('.auth-switch-btn');
    const usernameInput = container.querySelector('#username');
    const passwordInput = container.querySelector('#password');

    // Handle form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      errorMsg = '';
      
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      if (!username || !password) {
        errorMsg = 'Lütfen tüm alanları doldurun.';
        render();
        return;
      }

      if (username.length < 3) {
        errorMsg = 'Kullanıcı adı en az 3 karakter olmalıdır.';
        render();
        return;
      }

      if (password.length < 4) {
        errorMsg = 'Şifre en az 4 karakter olmalıdır.';
        render();
        return;
      }

      const users = getUsers();
      const userKey = username.toLowerCase();

      if (mode === 'login') {
        const existingUser = users[userKey];
        if (existingUser && existingUser.password === password) {
          onLogin(existingUser.username);
        } else {
          errorMsg = 'Kullanıcı adı veya şifre hatalı.';
          render();
        }
      } else {
        // Register mode
        if (users[userKey]) {
          errorMsg = 'Bu kullanıcı adı zaten alınmış.';
          render();
        } else {
          saveUser(username, password);
          onLogin(username);
        }
      }
    });

    // Toggle between login / register
    switchBtn.addEventListener('click', () => {
      mode = mode === 'login' ? 'register' : 'login';
      errorMsg = '';
      render();
    });
  };

  render();
  return container;
}
