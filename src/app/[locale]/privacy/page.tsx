import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-6 text-charcoal text-xs sm:text-sm leading-relaxed">
      <h1 className="font-serif text-3xl font-bold">Політика конфіденційності</h1>
      <p className="text-nude-600">
        Ця Політика конфіденційності встановлює порядок збору, зберігання та обробки персональних даних користувачів інтернет-магазину UliNail.
      </p>
      <h2 className="font-serif text-lg font-semibold mt-4">1. Збір інформації</h2>
      <p className="text-nude-600">
        Ми збираємо контактну інформацію (ім'я, номер телефону, email, адресу доставки) виключно з метою належного оформлення та відправки ваших замовлень, а також для повідомлення про статус доставки.
      </p>
      <h2 className="font-serif text-lg font-semibold mt-4">2. Захист даних</h2>
      <p className="text-nude-600">
        Ми використовуємо криптографічний протокол SSL для захисту ваших даних при передачі. Ваші платіжні реквізити обробляються захищеними шлюзами платіжних систем і не зберігаються на нашому сервері.
      </p>
    </div>
  );
}
