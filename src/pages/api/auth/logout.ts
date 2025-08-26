import type { APIRoute } from 'astro';
import { auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // PocketBase'den çıkış yap
    auth.logout();

    // Cookie'yi temizle
    const response = new Response(JSON.stringify({
      success: true,
      message: 'Çıkış başarılı!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Auth cookie'sini sil
    response.headers.set('Set-Cookie', 'pb_auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');

    return response;
  } catch (error) {
    console.error('Çıkış hatası:', error);
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
