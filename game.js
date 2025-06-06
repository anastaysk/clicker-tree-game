let clickCount = 0;
let totalClickCount = 0;
let currentState = 1;
const totalStates = 4;
const clicksPerState = 20;
const totalClicks = clicksPerState * totalStates;

const tree = document.getElementById('tree-image');
const platform = document.getElementById('platform');
const promoModal = document.getElementById('promo-modal');
const activateButton = document.getElementById('activate-button');
const promoCode = document.getElementById('promo-code');
const clickHint = document.getElementById('click-hint');
const progressBar = document.getElementById('progress-bar');

const treeImages = [
  'assets/first1.png',
  'assets/second1.png',
  'assets/third1.png',
  'assets/fourth1.png'
];

const preload = [
  'assets/first1.png',
  'assets/first2.png',
  'assets/first3.png',
  'assets/second1.png',
  'assets/second2.png',
  'assets/second3.png',
  'assets/third1.png',
  'assets/third2.png',
  'assets/third3.png',
  'assets/fourth1.png',
  'assets/fourth2.png',
  'assets/fourth3.png',
  'assets/background.png',
  'assets/popup_final.png'
];

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

document.addEventListener('dblclick', function(e) {
  e.preventDefault();
}, { passive: false });

preload.forEach(src => {
  const preloadedImage = new Image();
  preloadedImage.src = src;
});

treeImages.forEach(src => {
  const preloadedImage = new Image();
  preloadedImage.src = src;
});

const img = new Image();

const swayAnimations = [
  'sway-frames-1',
  'sway-frames-2',
  'sway-frames-3',
  'sway-frames-4'
];

const widths = ['118px', '412px', '296px', '457px'];
const bottoms = ['56%', '50%', '60%', '58%'];

let isAnimating = false;

window.addEventListener('click', (event) => {
  const treeRect = tree.getBoundingClientRect();
  const platformRect = platform.getBoundingClientRect();

  if (
    event.clientX >= platformRect.left && 
    event.clientX <= platformRect.right && 
    event.clientY >= treeRect.top - (treeRect.height) && 
    event.clientY <= platformRect.bottom
  ) {
    clickHint.style.display = 'none';
    handleTreeClick();
    updateProgressBar();
  }
});

function updateProgressBar() {
  const progressPercentage = (totalClickCount / totalClicks) * 92;
  progressBar.style.width = progressPercentage + '%';
}

function updateTreeState() {
  if (currentState < totalStates) {
    isAnimating = true;

    tree.classList.add('glowing-and-blinking');
    tree.style.animation = 'glow-and-blink 3s ease-in-out'

    setTimeout(() => {
      tree.classList.remove('glowing-and-blinking');
      currentState++;
      //tree.src = treeImages[currentState - 1];
      img.src = treeImages[currentState - 1];
      tree.src = img.src;
      tree.style.animation = swayAnimations[currentState - 1] + ' 2s steps(4) infinite';
      tree.style.width = widths[currentState - 1];
      tree.style.bottom = bottoms[currentState - 1];
      isAnimating = false;
    }, 1500);

  } else {
    isAnimating = true;
    fallCoins();
    setTimeout(() => {
      document.getElementById('overlay').style.display = 'block';
      promoModal.style.display = 'block';
    }, 3500);
  }
}

function handleTreeClick() {
  if (isAnimating) return;

  clickCount++;
  totalClickCount++;
  
  tree.classList.add('clicked');
  setTimeout(() => {
    tree.classList.remove('clicked');
  }, 100);

  if (clickCount >= clicksPerState) {
    clickCount = 0;
    updateTreeState();
  }

  fallLeaves();

}

function fallLeaves() {
  const treeRect = tree.getBoundingClientRect();
  const leafImages = [
    'assets/leaf1.png',
    'assets/leaf2.png',
    'assets/leaf3.png',
    'assets/leaf4.png'
  ];

  function createLeaf() {
    const leaf = document.createElement('img');
    const randomLeafImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.src = randomLeafImage;
    leaf.classList.add('leaf');

    const minX = treeRect.left + (treeRect.width / 4);
    const minY = treeRect.top + (treeRect.height / 4);

    const maxX = minX + (treeRect.width / 2);
    const maxY = minY + (treeRect.height / 2);

    const randomXOffset = Math.random() * (maxX - minX);
    const randomYOffset = Math.random() * (maxY - minY);

    const leafXPosition = minX + randomXOffset;
    const leafYPosition = minY + randomYOffset;

    leaf.style.left = leafXPosition + 'px';
    leaf.style.top = leafYPosition + 'px';

    document.body.appendChild(leaf);

    setTimeout(() => {
      leaf.classList.add('falling');
    }, 100);

    setTimeout(() => {
      leaf.remove();
    }, 3000);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(createLeaf, i * 300);
  }
}

activateButton.addEventListener('click', () => {
  activateButton.innerText = 'Kode promo Anda berhasil disalin, dan Anda akan dialihkan ke situs web.';
  activateButton.style.fontSize = '12px';
  activateButton.style.animation = 'none';
  activateButton.style.backgroundColor = '#7eb5df'
  
  //navigator.clipboard.writeText('Kode promo Anda berhasil disalin, dan Anda будете перенаправлены.') промокод сюда

  setTimeout(() => {
    window.location.href = 'https://www.google.com/'; // Установите нужный URL
  }, 3000);
});

function fallCoins() {
  const treeRect = tree.getBoundingClientRect();
  const coinImages = [
    'assets/coin1.png',
    'assets/coin2.png',
    'assets/coin3.png',
    'assets/coin4.png',
    'assets/coin5.png',
    'assets/coin6.png'
  ];

  function createCoin() {
    const coin = document.createElement('img');
    coin.src = coinImages[0];
    coin.classList.add('coin');

    const randomXOffset = Math.random() * window.innerWidth;
    const randomYOffset = Math.random() * window.innerHeight;

    coin.style.left = randomXOffset + 'px';
    coin.style.top = randomYOffset + 'px';

    document.body.appendChild(coin);

    let frame = 0;
    const animationInterval = setInterval(() => {
      frame = (frame + 1) % coinImages.length;
      coin.src = coinImages[frame];
    }, 100);

    coin.classList.add('falling');

    setTimeout(() => {
      clearInterval(animationInterval);
      coin.remove();
    }, 1500);
  }

  for (let i = 0; i < 70; i++) {
    setTimeout(createCoin, i * 100);
  }
}