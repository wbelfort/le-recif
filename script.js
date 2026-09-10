// ===== 1. Bascule 2015 / 2025 =====
// Change les couleurs de toute la page : récif vivant (2015) ou récif blanchi (2025).
const switchAnnee = document.getElementById('switch-annee');
const etatAnnee = document.getElementById('etat-annee');

switchAnnee.addEventListener('click', function () {
  const est2025 = document.body.classList.toggle('annee-2025');
  switchAnnee.setAttribute('aria-pressed', est2025);

  if (est2025) {
    etatAnnee.innerHTML = 'Vous êtes en <strong>2025</strong>&nbsp;: le corail a blanchi.';
  } else {
    etatAnnee.innerHTML = 'Vous êtes en <strong>2015</strong>&nbsp;: le récif est encore plein de couleurs.';
  }
});

// ===== 2. Boutons afficher / masquer (scénario et storyboard) =====
const boutonsToggle = document.querySelectorAll('.js-toggle');

boutonsToggle.forEach(function (bouton) {
  bouton.addEventListener('click', function () {
    const bloc = document.getElementById(bouton.dataset.target);
    const nom = bouton.dataset.target === 'bloc-scenario' ? 'le scénario' : 'le storyboard';

    bloc.hidden = !bloc.hidden;
    bouton.setAttribute('aria-expanded', !bloc.hidden);
    bouton.textContent = (bloc.hidden ? 'Afficher ' : 'Masquer ') + nom;
  });
});

// ===== 3. Agrandir le storyboard (visionneuse plein écran) =====
const storyboardImg = document.getElementById('storyboard-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

storyboardImg.addEventListener('click', function () {
  lightboxImg.src = storyboardImg.src;
  lightbox.hidden = false;
});

function fermerLightbox() {
  lightbox.hidden = true;
}

lightbox.addEventListener('click', fermerLightbox);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') fermerLightbox();
});

// ===== 4. Messages de remplacement si un fichier manque =====
storyboardImg.addEventListener('error', function () {
  document.getElementById('storyboard-figure').classList.add('is-missing');
});

document.querySelector('#video source').addEventListener('error', function () {
  document.getElementById('video-wrap').classList.add('is-missing');
});

// Si l'erreur a eu lieu avant le chargement du script
if (storyboardImg.complete && storyboardImg.naturalWidth === 0) {
  document.getElementById('storyboard-figure').classList.add('is-missing');
}
if (document.getElementById('video').networkState === 3) {
  document.getElementById('video-wrap').classList.add('is-missing');
}
