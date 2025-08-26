import type { APIRoute } from 'astro';
import { auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasyon
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'E-posta ve şifre gereklidir.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // PocketBase ile giriş
    const result = await auth.login(email, password);

    if (result.success) {
      // Cookie'ye auth token'ı kaydet
      const response = new Response(JSON.stringify({
        success: true,
        message: 'Giriş başarılı!',
        user: result.user
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Auth token'ı cookie olarak ayarla
      response.headers.set('Set-Cookie', `pb_auth=${result.user.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);

      return response;
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Giriş hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Sunucu hatası oluştu.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
