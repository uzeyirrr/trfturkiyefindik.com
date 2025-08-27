import type { APIRoute } from 'astro';
import { deliveries, auth } from '../../../lib/pocketbase.js';
import pb from '../../../lib/pocketbase.js';

export const GET: APIRoute = async ({ request }) => {
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

    // Sadece fabrika rolündeki kullanıcılar erişebilir
    if (currentUser.role !== 'factory') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bu sayfaya erişim yetkiniz yok'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Bu fabrikaya gelen teslimatları getir
    const result = await deliveries.getByFactory(currentUser.id);
    
    if (result.success) {
      // Her teslimat için üretici bilgilerini ekle
      const deliveriesWithUserDetails = await Promise.all(
        result.deliveries.map(async (delivery) => {
          try {
            const user = await pb.collection('users').getOne(delivery.user);
                         return {
               ...delivery,
               userDetails: {
                 name: user.name,
                 phone: user.phone || 'Belirtilmemiş',
                 city: user.city
               }
             };
                     } catch (error) {
             console.error('Kullanıcı bilgisi alınamadı:', error);
             return {
               ...delivery,
               userDetails: {
                 name: 'Bilinmeyen Kullanıcı',
                 phone: 'Belirtilmemiş',
                 city: 'Belirtilmemiş'
               }
             };
           }
        })
      );

      return new Response(JSON.stringify({
        success: true,
        deliveries: deliveriesWithUserDetails
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
    console.error('Fabrika teslimatları getirme hatası:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Sunucu hatası'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
