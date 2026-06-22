/**
 * FAQ Module — Ligeira Telecom
 * Handles: accordion toggle with exclusive open behavior
 */

export function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('open');

      // Close all items
      faqItems.forEach(i => i.classList.remove('open'));

      // Toggle current item
      if (!isCurrentlyOpen) {
        item.classList.add('open');
      }
    });

    // Keyboard accessibility
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}
