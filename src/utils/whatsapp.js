import { BUSINESS_PHONE, STORE_NAME } from '../config/app';

export const buildWhatsAppLink = (cartItems, customerInfo, deliveryInfo, storeInfo) => {
  // Format cart items
  const itemsList = cartItems.map(item => {
    const sizeText = item.size ? ` (${item.size})` : '';
    const itemTotal = item.price * item.quantity;
    return `• ${item.quantity}x ${item.name}${sizeText} - ${formatPrice(itemTotal)}`;
  }).join('\n');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = storeInfo?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  // Build message
  const message = [
    `🛒 *Nuevo pedido - ${STORE_NAME}*`,
    '',
    `📍 *Tienda:* ${storeInfo?.name || 'N/A'}`,
    '',
    `🛍️ *Productos:*`,
    itemsList,
    '',
    `💰 *Resumen:*`,
    `Subtotal: ${formatPrice(subtotal)}`,
    `Envío: ${formatPrice(deliveryFee)}`,
    `*Total: ${formatPrice(total)}*`,
    '',
    `👤 *Datos del cliente:*`,
    customerInfo.customerName ? `Nombre: ${customerInfo.customerName}` : '',
    customerInfo.customerPhone ? `Teléfono: ${customerInfo.customerPhone}` : '',
    '',
    `🚚 *Entrega:*`,
    `Dirección: ${deliveryInfo.address || 'No especificada'}`,
    `Horario: ${deliveryInfo.deliveryTime || 'Lo antes posible'}`,
    customerInfo.notes ? `Notas: ${customerInfo.notes}` : '',
    '',
    '¿Está disponible para entrega?'
  ].filter(line => line !== '').join('\n');

  // Create WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
};

export const openWhatsApp = (cartItems, customerInfo, deliveryInfo, storeInfo) => {
  const link = buildWhatsAppLink(cartItems, customerInfo, deliveryInfo, storeInfo);
  window.open(link, '_blank');
};