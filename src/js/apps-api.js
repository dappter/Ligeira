/**
 * Integração com a API do TMDB (The Movie Database) e APIs de Esportes.
 * O TMDB é a API oficial mais utilizada no Brasil por catálogos como Globoplay, Telecine e AdoroCinema.
 */

const TMDB_API_KEY = ''; // <-- Insira sua API Key do TMDB aqui futuramente

export async function initAppsImages() {
  const cards = document.querySelectorAll('.nio-app-card');
  if (cards.length < 3) return;

  // Fallback inteligente: Imagens reais em HD do próprio servidor do TMDB 
  // e cobertura esportiva para garantir o layout enquanto a chave da API não é configurada.
  const fallbackImages = [
    // 1. Copa 2026 / Jogos do Brasil (Foto esportiva de alta qualidade)
    'https://images.unsplash.com/photo-1508344928928-7105b67de45b?q=80&w=1200&auto=format&fit=crop',
    // 2. Filme do Telecine (Ex: Gladiador - Direto do CDN oficial do TMDB)
    'https://image.tmdb.org/t/p/original/m0SbwFNCa9enrZRQKXz4oBR8xMv.jpg',
    // 3. Catálogo Globoplay Nacional (Ex: Série 'Os Outros' - Direto do CDN oficial do TMDB)
    'https://image.tmdb.org/t/p/original/2wNUBqB1m82T1u3lK53qU2eJjWk.jpg'
  ];

  // Se o usuário não configurou a API KEY, usa as rotas diretas de imagens conhecidas
  if (!TMDB_API_KEY) {
    cards[0].style.backgroundImage = `url('${fallbackImages[0]}')`;
    cards[1].style.backgroundImage = `url('${fallbackImages[1]}')`;
    cards[2].style.backgroundImage = `url('${fallbackImages[2]}')`;
    return;
  }

  // Lógica OFICIAL de consumo da API do TMDB (Busca Dinâmica Real)
  try {
    // Busca dinâmica para o Telecine (Filmes em cartaz)
    const resMovie = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`);
    const dataMovie = await resMovie.json();
    if (dataMovie.results && dataMovie.results.length > 0) {
      cards[1].style.backgroundImage = `url('https://image.tmdb.org/t/p/original${dataMovie.results[0].backdrop_path}')`;
    }

    // Busca dinâmica para o Globoplay (Séries Brasileiras em alta)
    const resTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=pt&sort_by=popularity.desc`);
    const dataTv = await resTv.json();
    if (dataTv.results && dataTv.results.length > 0) {
      cards[2].style.backgroundImage = `url('https://image.tmdb.org/t/p/original${dataTv.results[0].backdrop_path}')`;
    }

    // A API de futebol exigiria a API-Football ou similar, mantemos o fallback de alta qualidade
    cards[0].style.backgroundImage = `url('${fallbackImages[0]}')`;

  } catch (error) {
    console.error("Erro ao buscar catálogo na API do TMDB:", error);
  }
}
