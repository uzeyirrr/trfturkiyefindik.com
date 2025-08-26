import type { APIRoute } from 'astro';
import { auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const currentUser = auth.getCurrentUser();

    if (currentUser) {
      return new Response(JSON.stringify({
        success: true,
        user: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Kullanıcı giriş yapmamış.'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Kullanıcı bilgisi getirme hatası:', error);
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
