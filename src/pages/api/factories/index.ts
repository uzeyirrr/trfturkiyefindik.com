import type { APIRoute } from 'astro';
import { factories, auth } from '../../../lib/pocketbase.js';

export const GET: APIRoute = async ({ request }) => {
  try {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Kullanıcının şehrindeki fabrikaları getir
    const result = await factories.getByCity(currentUser.city);
    
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
