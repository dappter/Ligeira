/**
 * Blog Entry Point — Blog Page
 * Ligeira Telecom
 */
import './css/style.css'
import './css/blog.css'

import {
  createIcons,
  Zap, MapPin, Instagram, Users, MessageCircle, ArrowRight, Clock,
  BookOpen, Wifi, Home, Gamepad2, Tag, Rss, ChevronRight, Mail
} from 'lucide'

import { initNavbar } from './js/navbar.js'

const ICONS = {
  Zap, MapPin, Instagram, Users, MessageCircle, ArrowRight, Clock,
  BookOpen, Wifi, Home, Gamepad2, Tag, Rss, ChevronRight, Mail
}

createIcons({ icons: ICONS })
initNavbar()

// Category filter
const catBtns = document.querySelectorAll('.blog-cat-btn')
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    // Filter logic could be expanded with real data
  })
})

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form')
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('newsletter-email')?.value
    if (email) {
      alert(`Obrigado! O e-mail ${email} foi cadastrado na newsletter da Ligeira.`)
      newsletterForm.reset()
    }
  })
}
