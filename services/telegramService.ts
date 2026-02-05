
const TELEGRAM_TOKEN = '8168183546:AAFDELTWxc8hQYHtVI6rqNfQUeN7sne4Nec';
const CHAT_ID = '6367981609';

export const sendOrderToTelegram = async (orderData: any) => {
  const { customer, items, shipping, total } = orderData;
  
  const itemsList = items.map((item: any) => 
    `• ${item.name} (${item.quantity}x) = ${item.price * item.quantity} دج`
  ).join('\n');

  const message = `
🛍️ **طلب جديد من Lumière Derme**
──────────────────
👤 **الزبون:** ${customer.name}
📞 **الهاتف:** ${customer.phone}
📍 **الولاية:** ${customer.wilaya}
🏠 **العنوان:** ${customer.address}

📦 **المنتجات:**
${itemsList}

🚚 **الشحن:** ${shipping.type === 'desk' ? 'مكتب ياليدين' : 'باب المنزل'}
💰 **تكلفة الشحن:** ${shipping.cost} دج

💵 **الإجمالي الكلي:** ${total + shipping.cost} دج
──────────────────
✅ يرجى الاتصال بالزبون لتأكيد الطلب.
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
};
