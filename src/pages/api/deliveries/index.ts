import type { APIRoute } from 'astro';
import { deliveries, auth } from '../../../lib/pocketbase.js';

export const GET: APIRoute = async ({ request }) => {
  try {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await deliveries.getByUser(currentUser.id);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { kg, teslimat_tarihi, factory } = body;

    // Validasyon
    if (!kg || !teslimat_tarihi || !factory) {
      return new Response(JSON.stringify({ success: false, error: 'Tüm alanlar gereklidir' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // En son fiyatı al
    const { prices } = await import('../../../lib/pocketbase.js');
    const pricesResult = await prices.getAll();
    
    if (!pricesResult.success || pricesResult.prices.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Fiyat bilgisi bulunamadı' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const latestPrice = pricesResult.prices[0];

    // Teslimat verilerini hazırla
    const deliveryData = {
      kg: parseFloat(kg),
      teslimat_tarihi,
      user: currentUser.id,
      factory,
      field: latestPrice.id, // En son fiyat ile ilişkilendir
      factory_price: latestPrice.price,
      tamamlandi: false,
      randiman: 0,
      odeme_tamamlandi: false
    };

    const result = await deliveries.create(deliveryData);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 201 : 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
