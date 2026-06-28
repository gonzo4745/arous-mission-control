const USERNAME = 'daniel';
const PASSWORD = 'arousai2026'; // change this to whatever you want

export default {
  async fetch(request, env) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Arous Mission Control"',
        },
      });
    }

    const base64 = authHeader.slice(6);
    const decoded = atob(base64);
    const [user, pass] = decoded.split(':');

    if (user !== USERNAME || pass !== PASSWORD) {
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Arous Mission Control"',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
