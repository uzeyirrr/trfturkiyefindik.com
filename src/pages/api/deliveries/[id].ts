import type { APIRoute } from 'astro';
import { deliveries, auth } from '../../../lib/pocketbase.js';
import pb from '../../../lib/pocketbase.js';

export const GET: APIRoute = async ({ params }) => {
  try {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { id } = params;
    
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Teslimat ID gerekli' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await deliveries.getById(id);
    
    if (result.success) {
      // Kullanıcının kendi teslimatını görüntüleyip görüntüleyemeyeceğini kontrol et
      if (result.delivery.user !== currentUser.id && currentUser.role !== 'admin' && currentUser.role !== 'factory') {
        return new Response(JSON.stringify({ success: false, error: 'Bu teslimatı görüntüleme yetkiniz yok' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Kullanıcı bilgilerini de ekle
      try {
        const user = await pb.collection('users').getOne(result.delivery.user);
                 result.delivery.userDetails = {
           name: user.name,
           phone: user.phone || 'Belirtilmemiş',
           city: user.city
         };
             } catch (error) {
         console.error('Kullanıcı bilgisi alınamadı:', error);
         result.delivery.userDetails = {
           name: 'Bilinmeyen Kullanıcı',
           phone: 'Belirtilmemiş',
           city: 'Belirtilmemiş'
         };
       }
    }
    
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

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    // Kullanıcının giriş yapmış olup olmadığını kontrol et
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Kullanıcı giriş yapmamış'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { id } = params;
    const body = await request.json();
    const { kg, randiman, factory_price, tamamlandi } = body;

    // Teslimatı getir
    const getResult = await deliveries.getById(id);
    if (!getResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Teslimat bulunamadı'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const delivery = getResult.delivery;

    // Yetki kontrolü: Sadece fabrika rolündeki kullanıcılar veya admin güncelleyebilir
    if (currentUser.role !== 'factory' && currentUser.role !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bu teslimatı güncelleme yetkiniz yok'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fabrika rolündeki kullanıcılar sadece kendi fabrikalarına gelen teslimatları güncelleyebilir
    if (currentUser.role === 'factory' && delivery.factory !== currentUser.id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bu teslimatı güncelleme yetkiniz yok'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Güncelleme verilerini hazırla
    const updateData = {};
    if (kg !== undefined) updateData.kg = kg;
    if (randiman !== undefined) updateData.randiman = randiman;
    if (factory_price !== undefined) updateData.factory_price = factory_price;
    if (tamamlandi !== undefined) updateData.tamamlandi = tamamlandi;

    // Teslimatı güncelle
    const result = await deliveries.update(id, updateData);
    
    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        delivery: result.delivery
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Teslimat güncelleme hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Sunucu hatası'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
