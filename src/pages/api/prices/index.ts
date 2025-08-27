import type { APIRoute } from 'astro';
import { prices, auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    // Kullanıcının giriş yapmış olup olmadığını kontrol et
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bu işlem için giriş yapmanız gereklidir.'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const result = await prices.getAll();

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        prices: result.prices
      }), {
        status: 200,
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
    console.error('Fiyat getirme hatası:', error);
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
