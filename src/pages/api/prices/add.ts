import type { APIRoute } from 'astro';
import { prices, auth } from '../../../lib/pocketbase.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { value, note } = body;

    // Validasyon
    if (!value) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Fiyat gereklidir.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (value <= 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Fiyat 0\'dan büyük olmalıdır.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Kullanıcı rolünü kontrol et (sadece admin ekleyebilir)
    const currentUser = auth.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bu işlem için admin yetkisi gereklidir.'
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Fiyat ekle
    const result = await prices.add(value, note);

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Fiyat başarıyla eklendi!',
        price: result.price
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
    console.error('Fiyat ekleme hatası:', error);
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
