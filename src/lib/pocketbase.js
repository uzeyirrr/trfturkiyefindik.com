import PocketBase from 'pocketbase';

// PocketBase istemcisini oluştur
const pb = new PocketBase('https://trfapi.yezuri.com/'); // Varsayılan PocketBase URL'i

// Kullanıcı kimlik doğrulama işlemleri
export const auth = {
  // Giriş yap
  async login(email, password) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return { success: true, user: authData.record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Kayıt ol
  async register(email, password, passwordConfirm, name, role = 'user') {
    try {
      const data = {
        email,
        password,
        passwordConfirm,
        name,
        role
      };
      const record = await pb.collection('users').create(data);
      return { success: true, user: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Çıkış yap
  logout() {
    pb.authStore.clear();
  },

  // Mevcut kullanıcıyı al
  getCurrentUser() {
    return pb.authStore.model;
  },

  // Kimlik doğrulama durumunu kontrol et
  isAuthenticated() {
    return pb.authStore.isValid;
  }
};

// Ürün işlemleri
export const products = {
  // Tüm ürünleri al
  async getAll() {
    try {
      const records = await pb.collection('products').getList(1, 50, {
        sort: '-created'
      });
      return { success: true, products: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Kullanıcının ürünlerini al
  async getByUser(userId) {
    try {
      const records = await pb.collection('products').getList(1, 50, {
        filter: `user = "${userId}"`,
        sort: '-created'
      });
      return { success: true, products: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Yeni ürün ekle
  async create(productData) {
    try {
      const record = await pb.collection('products').create(productData);
      return { success: true, product: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Ürün güncelle
  async update(id, productData) {
    try {
      const record = await pb.collection('products').update(id, productData);
      return { success: true, product: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Ürün sil
  async delete(id) {
    try {
      await pb.collection('products').delete(id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Sipariş işlemleri
export const orders = {
  // Tüm siparişleri al
  async getAll() {
    try {
      const records = await pb.collection('orders').getList(1, 50, {
        sort: '-created'
      });
      return { success: true, orders: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Kullanıcının siparişlerini al
  async getByUser(userId) {
    try {
      const records = await pb.collection('orders').getList(1, 50, {
        filter: `user = "${userId}"`,
        sort: '-created'
      });
      return { success: true, orders: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Yeni sipariş oluştur
  async create(orderData) {
    try {
      const record = await pb.collection('orders').create(orderData);
      return { success: true, order: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sipariş durumunu güncelle
  async updateStatus(id, status) {
    try {
      const record = await pb.collection('orders').update(id, { status });
      return { success: true, order: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Mesaj işlemleri
export const messages = {
  // Kullanıcının mesajlarını al
  async getByUser(userId) {
    try {
      const records = await pb.collection('messages').getList(1, 50, {
        filter: `sender = "${userId}" || receiver = "${userId}"`,
        sort: '-created'
      });
      return { success: true, messages: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Yeni mesaj gönder
  async send(messageData) {
    try {
      const record = await pb.collection('messages').create(messageData);
      return { success: true, message: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Fiyat işlemleri
export const prices = {
  // Tüm fiyatları getir
  async getAll() {
    try {
      const records = await pb.collection('price').getList(1, 50, {
        sort: '-created'
      });
      return { success: true, prices: records.items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Yeni fiyat ekle
  async add(value, note = '') {
    try {
      const data = {
        price: value,
        note
      };
      const record = await pb.collection('price').create(data);
      return { success: true, price: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Fiyat güncelle
  async update(id, data) {
    try {
      const record = await pb.collection('price').update(id, data);
      return { success: true, price: record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Fiyat sil
  async delete(id) {
    try {
      await pb.collection('price').delete(id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// İstatistik işlemleri
export const stats = {
  // Dashboard istatistiklerini al
  async getDashboardStats(userId) {
    try {
      // Ürün sayısı
      const productsResult = await pb.collection('products').getList(1, 1, {
        filter: `user = "${userId}"`
      });
      
      // Aktif sipariş sayısı
      const ordersResult = await pb.collection('orders').getList(1, 1, {
        filter: `user = "${userId}" && status = "active"`
      });
      
      // Toplam kazanç
      const totalEarningsResult = await pb.collection('orders').getList(1, 1000, {
        filter: `user = "${userId}" && status = "completed"`
      });
      
      const totalEarnings = totalEarningsResult.items.reduce((sum, order) => {
        return sum + (order.total || 0);
      }, 0);
      
      // Yeni mesaj sayısı
      const messagesResult = await pb.collection('messages').getList(1, 1, {
        filter: `receiver = "${userId}" && read = false`
      });
      
      return {
        success: true,
        stats: {
          totalProducts: productsResult.totalItems,
          activeOrders: ordersResult.totalItems,
          totalEarnings,
          newMessages: messagesResult.totalItems
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default pb;
