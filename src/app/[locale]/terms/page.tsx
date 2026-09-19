import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-6 text-charcoal text-xs sm:text-sm leading-relaxed">
      <h1 className="font-serif text-3xl font-bold">Договір публічної оферти</h1>
      <p className="text-nude-600">
        Цей Договір є публічною пропозицією Продавця (інтернет-магазин UliNail) укласти договір купівлі-продажу товарів дистанційним способом.
      </p>
      <h2 className="font-serif text-lg font-semibold mt-4">1. Предмет договору</h2>
      <p className="text-nude-600">
        Продавець зобов'язується передати у власність Покупця замовлений товар, а Покупець зобов'язується оплатити та прийняти товар на умовах цього Договору.
      </p>
      <h2 className="font-serif text-lg font-semibold mt-4">2. Момент укладення</h2>
      <p className="text-nude-600">
        Договір вважається укладеним з моменту натискання кнопки «Підтвердити замовлення» або «Kupuję i płacę» у кошику оформлення замовлення.
      </p>
    </div>
  );
}
