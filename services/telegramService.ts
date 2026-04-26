
const TELEGRAM_TOKEN = '8168183546:AAFDELTWxc8hQYHtVI6rqNfQUeN7sne4Nec';
const CHAT_ID = '6367981609';

export const sendOrderToTelegram = async (orderData: any) => {
  const { customer, items, shipping } = orderData;
  
  const escapeHTML = (text: string) => {
    if (!text) return '';
    return text.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m] || m));
  };

  const itemsList = items.map((item: any) => 
    `• <b>${escapeHTML(item.name)}</b> (${item.quantity} قطعة)`
  ).join('\n');

  const message = `
📦 <b>طلب جملة جديد من CABA DZ</b>
──────────────────
👤 <b>الزبون:</b> ${escapeHTML(customer.name)}
📞 <b>الهاتف:</b> ${escapeHTML(customer.phone)}
📍 <b>الولاية:</b> ${escapeHTML(customer.wilaya)}
🏠 <b>العنوان:</b> ${escapeHTML(customer.address)}
${customer.note ? `📝 <b>ملاحظة:</b> ${escapeHTML(customer.note)}` : ''}

🛒 <b>الطلبية:</b>
${itemsList}

🚚 <b>نوع التوصيل:</b> ${shipping.type === 'desk' ? 'مكتب ياليدين' : 'باب المنزل'}
──────────────────
⚠️ <i>ملاحظة: الأسعار ستحدد عند الاتصال بالزبون</i>
✅ يرجى الاتصال بالزبون لتأكيد السعر النهائي وإتمام الطلب.
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
    }
    
    return response.ok;
  } catch (error) {
    console.error('Telegram Fetch Error:', error);
    return false;
  }
};
