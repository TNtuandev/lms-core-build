declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface GoogleAuthResponse {
  access_token: string;
  id_token: string;
  user: GoogleUser;
}

// Load Google OAuth script
export const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(script);
  });
};

// Initialize Google OAuth
export const initializeGoogleAuth = async (): Promise<void> => {
  await loadGoogleScript();
  
  return new Promise((resolve) => {
    window.google.accounts.id.initialize({
      client_id: "331793075292-5dtrs02otoc2miakm437mb2r75l1mkbb.apps.googleusercontent.com",
      callback: () => {}, // Will be handled by the login function
    });
    resolve();
  });
};

// Handle Google OAuth login
export const signInWithGoogle = (): Promise<GoogleAuthResponse> => {
  return new Promise((resolve, reject) => {
    try {
      window.google.accounts.oauth2.initCodeClient({
        client_id: "331793075292-5dtrs02otoc2miakm437mb2r75l1mkbb.apps.googleusercontent.com",
        scope: 'email profile openid',
        ux_mode: 'popup',
        callback: async (response: any) => {
          if (response.code) {
            try {
              // Exchange authorization code for tokens
              const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  client_id: "331793075292-5dtrs02otoc2miakm437mb2r75l1mkbb.apps.googleusercontent.com",
                  code: response.code,
                  grant_type: 'authorization_code',
                  redirect_uri: window.location.origin,
                }),
              });

              const tokens = await tokenResponse.json();
              
              if (tokens.access_token) {
                // Get user info
                const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
                const user = await userResponse.json();

                resolve({
                  access_token: tokens.access_token,
                  id_token: tokens.id_token,
                  user,
                });
              } else {
                reject(new Error('Failed to get access token'));
              }
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('Authorization failed'));
          }
        },
        error_callback: (error: any) => {
          reject(new Error(error.error || 'Google OAuth failed'));
        },
      }).requestCode();
    } catch (error) {
      reject(error);
    }
  });
};