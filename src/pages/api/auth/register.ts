import type { APIRoute } from 'astro';
import { auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, password, passwordConfirm, role } = body;

    // Validasyon
    if (!name || !email || !password || !passwordConfirm || !role) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Tüm alanlar gereklidir.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (password !== passwordConfirm) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Şifreler eşleşmiyor.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Şifre en az 8 karakter olmalıdır.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // PocketBase ile kayıt
    const result = await auth.register(email, password, passwordConfirm, name, role);

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Kayıt başarılı!',
        user: result.user
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Kayıt hatası:', error);
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
